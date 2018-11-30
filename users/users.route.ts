import * as restify from 'restify' 
import { Router } from '../common/router'
import { User } from './users.model'

class UsersRouter extends Router {

    constructor(){
        super()
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }

    applyRoutes(app: restify.Server){
        
        app.get('/users', (req, res, next) => {
            User.find().then(this.render(res, next))              
        })

        app.get('/users/:id', (req, res, next) => {
            User.findById(req.params.id).then(this.render(res, next))  
        })

        app.post('/users', (req,res,next) => {

            let user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            
            user.save()
                .then(this.render(res, next))  
                .catch(next)
        })

        app.put('/users/:id', (req, res, next) => {
            const options = { overwrite: true }
            User.update({_id: req.params.id}, req.body, options).exec()
                .then(result => {

                    if(result.n){
                        return User.findById(req.params.id)
                        
                    }else{
                        res.send(404)
                    }
                })
                .then(this.render(res, next))  
                .catch(next)
        })

        app.patch('/users/:id', (req, res, next) => {
            const options = { new: true}
            User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(res, next))  
                .catch(next)
        })

        app.del('/users/:id',  (req, res, next) => {
            User.remove({_id: req.params.id}).exec()
                .then((cmdResult: any) => {
                    if (cmdResult.result.n) {
                        res.send(204)                        
                    }else{
                        res.send(404)
                    }
                    return next()
                })
                .catch(next)
        })
    }
}

export const usersRouter = new UsersRouter()