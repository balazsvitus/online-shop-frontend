import { Link, useNavigate } from 'react-router-dom';
import '../styles/Products.module.css';
import useAuthContext from '../../../hooks/useAuthContext';
import { useGetProductsQuery } from '../api/productApiSlice';
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import {
  AddRounded,
  ArrowForwardIosRounded,
  ShoppingCartRounded,
} from '@mui/icons-material';

export default function Products() {
  const { isAdmin } = useAuthContext();
  const { data, isLoading } = useGetProductsQuery();
  const navigate = useNavigate();

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

  const rowsToShow = data?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <div className="center-table-container">
      <div className="table-container">
        <div className="top-row">
          <Typography variant="h3">Products</Typography>
          <div className="top-row-buttons">
            <Link to="/cart">
              <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                <ShoppingCartRounded />
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              disabled={!isAdmin}
              onClick={() => navigate('/add-product')}
            >
              <AddRounded />
            </Button>
          </div>
        </div>
        {isLoading || !data ? (
          <Typography>Loading products...</Typography>
        ) : (
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
                    <TableCell
                      sx={{ fontWeight: 700, fontSize: '1rem' }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsToShow?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.category.name}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.price.toLocaleString()} RON</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => navigate(`/products/${row.id}`)}
                        >
                          <ArrowForwardIosRounded />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </div>
    </div>
  );
}
