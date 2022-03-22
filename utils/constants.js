
const transactionStatus = {
    STARTED: "STARTED",
    INPROGRESS: "IN-PROGRESS",
    COMPLETED: "COMPLETED",
  };

  const transactionType = {
    CREDIT : "CREDIT",
    DEBIT : "DEBIT"
  }

  const transactionConfirmedStatus  = {
    CONFIRMED: "CONFIRMED"
  }

module.exports = {
    transactionStatus,
    transactionType,
    transactionConfirmedStatus
}