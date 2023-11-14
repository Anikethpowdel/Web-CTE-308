// components/ReportsDoughnutChart.js
import Card from "@mui/material/Card";
import colors from "assets/theme/base/colors";
import { Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(Title, Tooltip, Legend);

function ReportsDoughnutChart({ title, description, chart }) {
  const chartData = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: dataset.backgroundColor.map(
          (color) => colors[color] || color
        ),
        hoverBackgroundColor: dataset.hoverBackgroundColor.map(
          (color) => colors[color] || color
        ),
      }))
    : [];

  const { data, options } = {
    data: {
      labels: chart.labels || [],
      datasets: chartData,
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: title,
          padding: 10,
          font: {
            size: 16,
          },
        },
        legend: {
          position: "bottom",
        },
      },
    },
  };

  return (
    <Card>
      <MDBox py={2} pr={2} pl={2}>
        {title || description ? (
          <MDBox px={1} pt={description ? 1 : 0}>
            {title && <MDTypography variant="h6">{title}</MDTypography>}
            <MDBox mb={2}>
              <MDTypography component="div" variant="button" color="text">
                {description}
              </MDTypography>
            </MDBox>
          </MDBox>
        ) : null}
        <MDBox height="200px">
          <Doughnut data={data} options={options} redraw />
        </MDBox>
      </MDBox>
    </Card>
  );
}

ReportsDoughnutChart.defaultProps = {
  title: "",
  description: "",
};

ReportsDoughnutChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  chart: PropTypes.object.isRequired,
};

export default ReportsDoughnutChart;
