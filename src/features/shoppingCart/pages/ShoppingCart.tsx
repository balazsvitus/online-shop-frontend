import { useNavigate } from 'react-router-dom';
import useShoppingCartContext from '../../../hooks/useShoppingCartContext';
import { ChangeEvent, useEffect, useState } from 'react';
import { createOrderDetails } from '../services/shopping-cart';
import { useAddOrderMutation } from '../api/orderApiSlice';
import useAuthContext from '../../../hooks/useAuthContext';
import {
  Button,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { ClearRounded } from '@mui/icons-material';
import { toast } from 'react-toastify';

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { authData } = useAuthContext();
  const [shippedFrom, setShippedFrom] = useState<string>(
    '485229c8-732e-4b0b-bdea-19c249a70b70',
  );
  const { shoppingCart, removeFromShoppingCart, emptyShoppingCart } =
    useShoppingCartContext();
  const [
    checkout,
    {
      isLoading: isCheckoutLoading,
      isSuccess: isCheckoutSuccess,
      error: checkoutError,
    },
  ] = useAddOrderMutation();

  useEffect(() => {
    if (isCheckoutSuccess) {
      toast.success('You successfully ordered the items!');
      emptyShoppingCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckoutSuccess]);

  useEffect(() => {
    if (checkoutError)
      alert((checkoutError as { data: { message: string } }).data.message);
  }, [checkoutError]);

  const handleBack = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    const order = createOrderDetails(shoppingCart, shippedFrom, authData.id);
    checkout(order);
  };

  const handleLocationChange = (event: SelectChangeEvent<string>) => {
    setShippedFrom(event.target.value);
  };

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowsToShow = shoppingCart?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <div className="center-table-container">
      <div className="table-container">
        <div className="top-row">
          <Typography variant="h3">Shopping cart</Typography>
          <div className="top-row-buttons">
            <Button
              variant="contained"
              color="secondary"
              sx={{ mr: 1 }}
              onClick={handleBack}
            >
              BACK
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={shoppingCart.length === 0 || isCheckoutLoading}
              onClick={handleCheckout}
            >
              CHECKOUT
            </Button>
          </div>
        </div>
        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>
                    Category
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>
                    Product Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>
                    Price
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>
                    Quantity
                  </TableCell>
                  {/* <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>
                    Location
                  </TableCell> */}
                  <TableCell
                    sx={{ fontWeight: 700, fontSize: '1rem' }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shoppingCart.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography variant="h6">
                        There are no items in your shopping cart!
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {rowsToShow?.map((row) => (
                      <TableRow key={row.product.id}>
                        <TableCell>{row.product.category.name}</TableCell>
                        <TableCell>{row.product.name}</TableCell>
                        <TableCell>{row.product.price} RON</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        {/* <TableCell>
                      <Select
                        value={shippedFrom}
                        onChange={handleLocationChange}
                      >
                        <MenuItem value="485229c8-732e-4b0b-bdea-19c249a70b70">
                          Vivo Cluj-Napoca
                        </MenuItem>
                        <MenuItem value="819056fc-ca67-4cbf-9dd3-f3765d4c8719">
                          Kaufland Targu Secuiesc
                        </MenuItem>
                      </Select>
                    </TableCell> */}
                        <TableCell>
                          <IconButton
                            onClick={() => removeFromShoppingCart(row.product)}
                          >
                            <ClearRounded />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={shoppingCart.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <Select
          value={shippedFrom}
          onChange={handleLocationChange}
          sx={{ width: 'fit-content' }}
        >
          <MenuItem value="485229c8-732e-4b0b-bdea-19c249a70b70">
            Vivo Cluj-Napoca
          </MenuItem>
          <MenuItem value="819056fc-ca67-4cbf-9dd3-f3765d4c8719">
            Kaufland Targu Secuiesc
          </MenuItem>
        </Select>
      </div>
    </div>
  );
}
