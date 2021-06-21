import React, { Component } from 'react';
import FetchData from '../../FetchRestAPI/FetchData';
import { getParams } from '../../GetSearchedParams/Params';
import { DELETE_ADMIN_PRODUCT_URL, CREATE_ADMIN_PRODUCT_URL, EDIT_ADMIN_PRODUCT_URL, GET_ADMIN_PRODUCTS_URL, GET_PRODUCT_URL } from '../../QueryLinks/QueryLinks';
import { GET, POST } from '../../RequestMethods/Methods';

class ProductService extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    getProducts = async (sorts) => {
        let id = getParams("categoryId");
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

        if (id === null || id === undefined) {
            id = "";
        }
        
        const search = getParams("search");
        
        const paramId = "?categoryId=";
        const targetPage = "&targetPage=";
        const sortParam = "&sort=";
        
        let composeLink = paramId + `${id}` + sortParam + sort;
        
        if (search !== undefined && search !== null) {
            composeLink += `&search=${search}`;
        }

        composeLink += targetPage;
        
        const result = await FetchData(GET_PRODUCT_URL + composeLink + currentPage, null, GET);
        return await result;
    }

    getAdminProducts = async (sorts) => {
        let id = getParams("categoryId");
        let currentPage = getParams("targetPage");
        let sort = getParams("sort");
        let search = getParams("search");

        const questionQuery = "?a="
        const paramId = "&categoryId=";
        const targetPage = "&targetPage=";
        const sortParam = "&sort=";
        
        if (sort === undefined || sort === null) {
            sort = "";
        }

        if (sorts !== undefined || sorts !== null) {
            sort = sorts;
        }

        if (currentPage === undefined || currentPage === null) {
            currentPage = "1";
        }

        let composeLink = questionQuery;
        const categoryId = paramId + `${id}`;
        const sortParams = sortParam + sort + targetPage + currentPage;

        if (sorts !== undefined || sorts !== null || id.length <= 0) {
            id=null;
        } else {
            composeLink += categoryId;
        }

        composeLink += sortParams;

        if (search !== undefined || search !== null || search.length > 0) {
            composeLink += `&search=${search}`;
        }
        
        const result = await FetchData(GET_ADMIN_PRODUCTS_URL + composeLink, null, GET);
        return await result;
    }

    
    create = async (payload) => {
        const result = await FetchData(CREATE_ADMIN_PRODUCT_URL, payload, POST);
        return await result;    
    }

    edit = async (payload) => {
        const result = await FetchData(EDIT_ADMIN_PRODUCT_URL, payload, POST);
        return result;
    }

    delete = async (payload) => {
        const result = await FetchData(DELETE_ADMIN_PRODUCT_URL, payload, POST);
        return result;
    }
}

export default ProductService;