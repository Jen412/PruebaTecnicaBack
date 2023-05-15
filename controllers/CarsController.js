
const getColors = (req, res)=>{
    const colors = ['#FF5733', '#54C99D', '#FFC300', '#900C3F', '#581845', '#900DFF', '#FF9F1C', '#FF5733', '#227093', '#22A7F0', '#4BCFFA', '#2C3A47', '#A04000', '#5B2C6F', '#C0392B', '#27AE60', '#D35400', '#8E44AD', '#154360', '#F5B7B1'];
    const carModels = ['Toyota Camry', 'Honda Civic', 'Ford Mustang', 'Chevrolet Corvette', 'Tesla Model S', 'Jeep Wrangler', 'BMW 3 Series', 'Mercedes-Benz C-Class', 'Audi A4', 'Porsche 911', 'Mazda CX-5', 'Subaru Outback'];

    const uniqueColors = [];
    let colorsT = colors;
    while (uniqueColors.length < 12) {
        const index = Math.floor(Math.random() * colorsT.length);
        const color = colorsT[index];
        if (!uniqueColors.includes(color)) {
            uniqueColors.push(color);
            colorsT.splice(index, 1);
        }
    }
    let response = [];
    for (let i = 0; i < carModels.length; i++) {
        response= [
            ...response,
            {
                model: carModels[i],
                color: uniqueColors[i]
            }
        ]
    }
    res.json({data: response});
}

export  {
    getColors
};