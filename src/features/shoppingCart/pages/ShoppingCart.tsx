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
import { ShoppingCartItemType } from '../../../types/ShoppingCart';
import { LOCATIONS } from '../../../lib/constants';

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { authData } = useAuthContext();
  const {
    shoppingCart,
    removeFromShoppingCart,
    emptyShoppingCart,
    modifyShoppingCartItemLocation,
  } = useShoppingCartContext();
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
      toast.error(
        (checkoutError as { data: { message: string } }).data.message,
      );
  }, [checkoutError]);

  const handleBack = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    const order = createOrderDetails(shoppingCart, authData.id);
    checkout(order);
  };

  const handleLocationChange = (
    event: SelectChangeEvent<string>,
    row: ShoppingCartItemType,
  ) => {
    modifyShoppingCartItemLocation(
      row.product,
      row.location,
      event.target.value,
    );
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
                  <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>
                    Location
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, fontSize: '1rem' }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shoppingCart.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="h6">
                        There are no items in your shopping cart!
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {rowsToShow?.map((row) => (
                      <TableRow key={row.product.id + row.location}>
                        <TableCell>{row.product.category.name}</TableCell>
                        <TableCell>{row.product.name}</TableCell>
                        <TableCell>{row.product.price} RON</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>
                          <Select
                            value={row.location}
                            onChange={(event) =>
                              handleLocationChange(event, row)
                            }
                          >
                            {LOCATIONS.map((location) => (
                              <MenuItem value={location.id}>
                                {location.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() =>
                              removeFromShoppingCart(row.product, row.location)
                            }
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
      </div>
    </div>
  );
}
