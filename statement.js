var playsGlobal;
var invoiceGlobal;
function amountFor(aPerformance) {
  let result=0;
  switch (playFor(aPerformance).type) {
    case "tragedy":
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`unknown type: ${playFor(aPerformance).type}`);
  }
  return result;
}


function playFor(perf) {
  return playsGlobal[perf.playID];
}


function statement (invoice, plays) {
  playsGlobal = plays;
  invoiceGlobal=invoice;

  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    // print line for this order
    result += ` ${ playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;
}

function totalAmount() {
  let result = 0;
  for (let perf of invoiceGlobal.performances) {
    result += amountFor(perf);
  }
  return result;
}

function totalVolumeCredits(){
  let volumeCredits = 0;
  for (let perf of invoiceGlobal.performances) {
    volumeCredits += volumeCreditsFor(perf);
  }
  return volumeCredits;
}

function volumeCreditsFor(aPerformance) {
  let volumeCredits = 0;
  volumeCredits += Math.max(aPerformance.audience - 30, 0);
  if ("comedy" === playFor(aPerformance).type) volumeCredits +=
      Math.floor(aPerformance.audience / 5);
  return volumeCredits;
}

function  usd(aNumber) {
    return new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD",
          minimumFractionDigits: 2 }).format(aNumber/100);
}

export default statement;
