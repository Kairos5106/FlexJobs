import React from 'react';

const EarningsOverviewBuyer = ({ totalExpenditure, outstandingBalance, upcomingPayment, nextPaymentDate }) => {
  return (
    <div className="container my-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-12 card bg-light text-center earnings-overview">
          <div className="card-body row">
            <div className="col-md-3 earnings-border">
              <h4 className="mb-4 mt-4">Total Expenditure</h4>
              <p className="mb-0 fw-bold text-center fs-2">{totalExpenditure}</p>
            </div>
            <div className="col-md-3 earnings-border">
              <h4 className="mb-4 mt-4">Outstanding Balance</h4>
              <p className="mb-0 fw-bold text-center fs-2">{outstandingBalance}</p>
            </div>
            <div className="col-md-3 earnings-border">
              <h4 className="mb-4 mt-4">Upcoming payment</h4>
              <p className="mb-0 fw-bold text-center fs-2">{upcomingPayment}</p>
            </div>
            <div className="col-md-3">
              <h4 className="mb-4 mt-4">Next payment date</h4>
              <div className="d-flex justify-content-center">
                <div className="col">
                  <h1 className="mb-0 fw-bold text-center date-number">{nextPaymentDate.day}</h1>
                </div>
                <div className="col">
                  <div className="row">
                    <p className="mb-0 fw-bold text-center fs-2 date-month">{nextPaymentDate.month}</p>
                  </div>
                  <div className="row">
                    <p className="mb-0 fw-bold text-center fs-2 date-year">{nextPaymentDate.year}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EarningsOverviewBuyer;