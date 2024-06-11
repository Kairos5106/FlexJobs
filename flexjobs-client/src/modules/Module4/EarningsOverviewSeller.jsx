import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EarningsOverviewSeller = ({ totalEarnings, earningsPast30Days, averageDailyEarnings, earningsTrendImg }) => {
  return (
    <div className="container-payments my-4 mb-5 justify-center">
      <div className="row justify-content-center">
        <div className="col-md-8 card bg-light text-center earnings-overview">
          <div className="card-body row">
            <div className="col-md-4 earnings-border">
              <h4 className="mb-4 mt-4">Total Earnings</h4>
              <p className="mb-0 fw-bold text-center fs-2">{totalEarnings}</p>
            </div>
            <div className="col-md-4 earnings-border">
              <h4 className="mb-4 mt-4">Earnings Past 30 Days</h4>
              <p className="mb-0 fw-bold text-center fs-2">{earningsPast30Days}</p>
            </div>
            <div className="col-md-4">
              <h4 className="mb-4 mt-4">Average Daily Earnings</h4>
              <p className="mb-0 fw-bold text-center fs-2">{averageDailyEarnings}</p>
            </div>
          </div>
        </div>
        <div className="col-md-1 custom-earnings-width"></div>
        {/* <div className="col-md-2 card bg-light text-center">
          <div className="col-md-12">
            <h4 className="mb-2 mt-2">Earnings Trend</h4>
            <img src={earningsTrendImg} alt="Earnings Trend" className="img-fluid" style={{ maxWidth: "80%", height: "auto" }} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default EarningsOverviewSeller;