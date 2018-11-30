import * as restify from 'restify' 
import { Router } from '../common/router'
import { User } from './users.model'

class UsersRouter extends Router {
    applyRoutes(app: restify.Server){
        
        app.get('/users', (req, res, next) => {
            User.find().then(users => {
                res.json(users)
                return next()
            })                        
        })

        app.get('/users/:id', (req, res, next) => {
            User.findById(req.params.id).then(user => {
                if(user){
                    res.status(200)
                    res.json(user)
                    return next()
                }
                res.json({error: 'not found'})
                res.status(404)
                return next()
            })
        })

        app.post('/users', (req,res,next) => {
            // let user = new User(req.body)

            let user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            
            user.save()
                .then(user => {    
                    res.status(201)
                    user.password = undefined
                    res.json(user)
                    return next()
                })
                .catch(err => {
                    res.status(400)
                    res.json({ 
                        message: 'Falha ao cadastrar User!', 
                        error: err
                    })
                    return next()
                })
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
                .then(user => {
                    res.json(user)
                    return next()
                })
        })

        app.patch('/users/:id', (req, res, next) => {
            const options = { new: true}
            User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(user => {
                    if (user) {
                        user.password = undefined
                        res.json(user)
                        return next()
                    }
                    res.send(404)
                    return next()
                })
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
        })
    }
}

export const usersRouter = new UsersRouter()            // let user = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // }