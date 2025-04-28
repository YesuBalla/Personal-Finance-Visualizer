const categoryDescriptionsMap: { [key: string]: string[] } = {
    Food: ["Grocery shopping", "Restaurant dinner", "Coffee shop visit", "Snack purchase", "Fast food order"],
    Rent: ["Monthly apartment rent", "Shared room rent payment", "Studio rent"],
    Utilities: ["Electricity bill", "Water bill", "Internet subscription", "Gas bill"],
    Transportation: ["Bus fare", "Train ticket", "Uber ride", "Fuel refill"],
    Entertainment: ["Movie ticket", "Concert entry", "Streaming service subscription", "Museum visit"],
    Health: ["Pharmacy purchase", "Doctor appointment", "Gym membership", "Dental checkup"],
    Shopping: ["Clothing purchase", "Gadget shopping", "Online shopping", "Gift shopping"],
    Education: ["Online course fee", "Textbook purchase", "Workshop registration"],
    Investments: ["Stock purchase", "Mutual fund investment", "Cryptocurrency purchase"],
    Travel: ["Flight ticket", "Hotel booking", "Local tour expenses", "Airport taxi"],
};

export const generateDummyTransactions = (count: number = 48) => {
    const transactions = [];
    const categories = Object.keys(categoryDescriptionsMap);

    // Get the current date and subtract 12 months for the range
    const today = new Date();
    const twelveMonthsAgo = new Date(today);
    twelveMonthsAgo.setMonth(today.getMonth() - 12);

    // Generate data for the last 12 months
    for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
        const currentMonth = new Date(twelveMonthsAgo);
        currentMonth.setMonth(twelveMonthsAgo.getMonth() + monthOffset);

        // Random number of transactions per month (up to 4)
        const numTransactions = Math.floor(Math.random() * 4) + 1;

        for (let i = 0; i < numTransactions; i++) {
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            const descriptions = categoryDescriptionsMap[randomCategory];
            const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
            const randomAmount = Math.floor(Math.random() * 5000) + 100;

            // Randomize the day of the month
            const dayOfMonth = Math.floor(Math.random() * 28) + 1;
            const date = new Date(currentMonth);
            date.setDate(dayOfMonth);

            transactions.push({
                amount: randomAmount,
                category: randomCategory,
                description: randomDescription,
                date,
            });
        }
    }

    return transactions;
};
