import conf from '../conf.js';

import {Client, ID, Databases, Storage, Query} from "appwrite";


export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases = new Databases(this.client)
            this.bucket =new Storage(this.client);
        }

        async createPost({title, slug, content, featuredImage, status, userId}){
            try {
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                        userId,
                    }
                )
            } catch (error) {
                throw error;
            }
        }

        async updatepost(slug, {title, content, featuredImage, status, userId}){
            try {
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        userId,
                        status,
                    }
                )
            } catch (error) {
                throw error;
            }
        }
        async deletePost(slug){
            try {
                await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                )
                return true
            } catch (error) {
                throw error;
                
            }
        }
        
}

const service = new Service()

export default service;