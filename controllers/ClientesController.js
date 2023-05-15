
const personNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Jessica', 'Robert', 'Emily', 'William', 'Ava', 'Oliver', 'Mia', 'James', 'Sophia', 'Benjamin', 'Isabella'];


const getClients = (req, res) =>{
    res.json({clients:personNames});
}

export {
    getClients
}