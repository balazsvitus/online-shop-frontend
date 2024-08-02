import { useGetStatisticsQuery } from '../api/orderDetailsApiSlice';
import { Grid, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import darkUnica from 'highcharts/themes/dark-unica';

darkUnica(Highcharts);

interface CustomSeriesPieOptions extends Highcharts.SeriesPieOptions {
  colorByPoint?: boolean;
}

export default function CategoryChart() {
  const { isLoading, data } = useGetStatisticsQuery();
  let categories: string[] = [];
  let values: number[] = [];

  if (data) {
    categories = data.map((data) => data.categoryName);
    values = data.map((data) => data.salesFigures);
  }

  const barChartOptions: Highcharts.Options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Sales figures per product category',
    },
    xAxis: {
      categories: categories,
      title: {
        text: 'Product Categories',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Sales Figures',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: values,
      },
    ],
  };

  const pieChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Sales figures per product category',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Sales',
        type: 'pie',
        colorByPoint: true,
        data: values,
      } as CustomSeriesPieOptions,
    ],
  };

  if (isLoading) {
    return <Typography>The statistics are loading...</Typography>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <div style={{ padding: '2rem' }}>
          <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <div style={{ padding: '2rem' }}>
          <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
        </div>
      </Grid>
    </Grid>
  );
}
