
const mapUser = (data,model)=>{
    if(data.fullname){
        model.fullname = data.fullname
    }
    if(data.username){
        model.username = data.username
    }
    if(data.address){
        model.address = data.address
    }
    if(data.password){
        model.password = data.password
    }
    if(data.mail){
        model.mail = data.mail
    }
    if(data.contact){
        model.contact = data.contact
    }
    if(data.role){
        model.role = data.role
    }

    return model
}

module.exports = {mapUser}