import React, { Component } from 'react';
import FetchData from '../../FetchRestAPI/FetchData';
import { getParams } from '../../GetSearchedParams/Params';
import { GET_CATEGORY_URL, GET_CATEGORY_FOR_ADMIN_PANEL_URL, CREATE_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY } from '../../QueryLinks/QueryLinks';
import { GET, POST } from '../../RequestMethods/Methods';

class CategoryService extends Component {
    constructor(props) {
    super(props)
     
    this.state = {
        categories: null,
        }
    }

    getCategories = async () => {

        const result = await FetchData(GET_CATEGORY_URL, null, GET);

        if (await result) {
            this.setState({
                categories: result,
            });
            return result;
        }

        return this.state.categories;   
    }

    getCategoriesAdmin = async (sorts) => {
           
        let currentPage = getParams("targetPage");
        let sort = getParams("sort");
        if (sort === undefined || sort === null) {
            sort = "";
        }

        if (sorts !== undefined || sorts !== null) {
            sort = sorts;
        }

        if (currentPage === undefined || currentPage === null) {
            currentPage = "1";
        }
        
        const targetPage = "&targetPage=";
        const sortParam = "?sort=";
        
        const composeLink = sortParam + sort + targetPage + currentPage;
        

        let query = GET_CATEGORY_FOR_ADMIN_PANEL_URL + composeLink;
        // if (targetPage !== undefined) {
        //     query += ("?targetPage=" + targetPage);
        // }

        const result = await FetchData(query, null, GET);

        if (await result) {
            this.setState({
                categories: result,
            });
            return result;
        }

        return this.state.categories;   
    }

    create = async (payload) => {
        const result = await FetchData(CREATE_CATEGORY, payload, POST);
        return await result;    
    }

    edit = async (payload) => {
        const result = await FetchData(EDIT_CATEGORY, payload, POST);
        return result;
    }

    delete = async (payload) => {
        const result = await FetchData(DELETE_CATEGORY, payload, POST);
        return result;
    }
}

export default CategoryService;