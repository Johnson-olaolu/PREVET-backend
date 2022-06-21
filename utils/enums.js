const accountTypes  = [
    "ADMIN",
    "VETTER",
    "CUSTOMER"
]

const vettingStatus =[
    "INITIATED" ,
    "STARTED",
    "COMPLETED" 
]
const transactionStatus = [
    "STARTED",
    "IN-PROGRESS",
    "COMPLETED",
  ];
  
  const transactionType = [
    "CREDIT",
    "DEBIT"
  ]
  
  const transactionConfirmedStatus = [
    "CONFIRMED"
  ]
  
  module.exports = {
    accountTypes,
    vettingStatus,
    transactionStatus,
    transactionType,
    transactionConfirmedStatus
  }