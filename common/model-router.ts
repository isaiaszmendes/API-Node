import * as mongoose from 'mongoose';
import { Router } from './router';
import {  NotFoundError} from 'restify-errors'


export abstract class ModelRouter<D extends mongoose.Document> extends Router {
    constructor(protected model: mongoose.Model<D>){
        super()
    }
    // Para paginação
    pageSize: number = 20

    envelope(document: any): any {
        let resource = Object.assign({_links:{}}, document.toJSON())
        resource._links.self = `/${this.model.collection.name}/${resource._id}`
        return resource
    }

    validateId = (req, res, next) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            next(new NotFoundError('Document not found'))
        }else{
            next()
        }
    }

    findAll = (req, res, next) => {
        let page = parseInt(req.query._page || 1)
        page = page > 0 ? page : 1
        const skip = (page - 1) * this.pageSize
        this.model.find()
            .skip(skip)
            .limit(this.pageSize)
            .then(this.renderAll(res, next)) 
            .catch(next)             
    }

    findById = (req, res, next) => {
        this.model.findById(req.params.id).then(this.render(res, next))  
    }

    save = (req,res,next) => {
        let document = new this.model(req.body)
        document.save()
            .then(this.render(res, next))  
            .catch(next)
    }

    replace = (req, res, next) => {
        const options = { runValidators: true, overwrite: true }
        this.model.update({_id: req.params.id}, req.body, options).exec()
            .then(result => {

                if(result.n){
                    return this.model.findById(req.params.id)
                    
                }else{
                    res.send(404)                  
                }
            })
            .then(this.render(res, next))  
            .catch(next)
    }

    update = (req, res, next) => {
        const options = { runValidators: true, new: true}
        this.model.findByIdAndUpdate(req.params.id, req.body, options)
            .then(this.render(res, next))  
            .catch(next)
    }

    delete = (req, res, next) => {
        this.model.remove({_id: req.params.id}).exec()
            .then((cmdResult: any) => {
                if (cmdResult.result.n) {
                    res.send(204)                        
                }else{
                    res.send(404)
                }
                return next()
            })
            .catch(next)
    }


}