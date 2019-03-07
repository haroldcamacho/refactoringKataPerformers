var invoiceGlobal;
import createStatementData from './createStatementData.js';




function renderPlainText(data , plays){
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount)}
(${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}


function statement (invoice, plays) {
  invoiceGlobal=invoice;
  return renderPlainText(createStatementData(invoice, plays));
}



function  usd(aNumber) {
    return new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD",
          minimumFractionDigits: 2 }).format(aNumber/100);
}

export default statement;
