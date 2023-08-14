const getClients= (req, res) => {
    const {id} = req.params;
    const {data}= req.query;
    if(data){
        res.send({
            clients:{
                name: 'Juan',
                age:'18',
                data: data,
                id: id
            }
    })}else{
        res.send({
            clients:[{
                name: 'Juan',
                age:'18'
            },
            {
                name: 'Pedro',
                age:'20'
            }]
        })
    }
}
const getClient= (req, res) => {
    res.send({
        clients:{
            name: 'Juan',
            age:'18'
        }
    })
}

module.exports = { getClients, getClient}
