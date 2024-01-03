const fs = require('fs');
const csv = require('csv-parser');

const apiUrl = 'https://geteligibleuserrequest-xqbg2swtrq-uc.a.run.app/?address=';

// Function to make API call and log results
async function checkEligibility(wallet) {
  try {
    const response = await fetch(apiUrl + wallet);
    const responseData = await response.json();

    if (responseData.amount) {
      console.log(`${wallet} is eligible for ${responseData.amount} $DYM`);
    } else {
      console.log(`${wallet} is not eligible for any amount`);
    }
  } catch (error) {
    console.error(`Error checking eligibility for ${wallet}:`, error.message);
  }
}

// Read wallet addresses from CSV file and make API calls
fs.createReadStream('wallets.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Assuming the wallet address column in CSV is named 'wallet'
    const walletAddress = row.wallet.trim(); // Remove leading/trailing whitespaces
    checkEligibility(walletAddress);
  })
  .on('end', () => {
    console.log('CSV file processing complete.');
  });
