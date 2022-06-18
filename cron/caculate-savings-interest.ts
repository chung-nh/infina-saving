const moment = require("moment");
const db = require("./database/index.ts");
const FIXED_INTEREST_DAY = 0.07 / 365;

const calculateSavingsInterest = async (date) => {
    console.log('-----------------START-----------------');
    console.log('date: ', date);

    const cntSavings = await db.pg('savings').count('id as CNT').first();

    console.log('Total record: ', cntSavings.CNT);
    let cnt = 0;

    // Need improve: read and run every 1000
    // if (cntSavings.CNT > 1000) {
    //     const chunkSize = 1000;
    //     for (let i = 0; i < cntSavings.CNT; i += chunkSize) {
    //         // const chunk = array.slice(i, i + chunkSize);
    //     }
    // } else {
    await db.pg('savings').select('id', 'user_id', 'amount').then((result) => {
        result.forEach(item => {
            let csi = Math.round(FIXED_INTEREST_DAY * item.amount * 100) / 100 + parseFloat(item.amount);
            db.pg('savings')
                .where({ id: item.id })
                .update({
                    amount: csi
                })
            cnt++;
            // Need improve insert history change here.
        });
    }).then(() => {
        console.log('Total record updated: ', cnt);
    });
    // }
    console.log('-----------------END-----------------');
    process.exit()
}

let runtime = '';

// Get runtime
if (process.argv[2]) {
    runtime = process.argv[2];
} else {
    const date = new Date();
    runtime = moment(date).format('YYYY-MM-DD');
}

// Run calculate Savings Interest
calculateSavingsInterest(runtime);