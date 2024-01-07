import Listing from '../models/listing.model.js';
import {errorHandler} from '../utils/error.js';// import listing model and error handler function

export const createListing =  async (req, res, next) => {// function ot create a new listing
    try{
        const listing = await Listing.create(req.body);// create a listing from request body
        return res.status(201).json(listing);//respond with created listing and HTTP status 201
    }catch (error) {// forward error if any to middleware
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {// function to delete a listing
    const listing = await Listing.findById(req.params.id);// find the listing by id

    if (!listing) {
        return next(errorHandler(404, 'Listing not found.'));// handle case if listing is not found
    }
    if(req.user.id !== listing.userRef) {// check if authenticated used can delete record
        return next(errorHandler(404, 'You can only delete your own listing'));
    }

    try{
        await Listing.findByIdAndDelete(req.params.id);// delete listing
        res.status(200).json('Listing has been deleted');// respond with success message and HTTP status 200
    } catch (error) {// forward any error to next middleware
        next(error);
    }
};

export const updateListing = async (req, res, next) => {// function to update a listing
    const listing = await Listing.findById(req.params.id);// find the listing by id

    if (!listing) {
        return next(errorHandler(404, 'Listing not found.'));// if listing is not found
    }
    if(req.user.id !== listing.userRef) {// has the user got the right to update the listing?
        return next(errorHandler(404, 'You can only delete your own listing'));
    }

    try{
        const updatedListing = await Listing.findByIdAndUpdate(// update the listing with the provided data, return updated listing
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json(updatedListing);// respond with updated listing and HTTP status
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next) => {// function to get listing details by id
    try {
    const listing = await Listing.findById(req.params.id);// find listing by id
   if (!listing) {
        return next(errorHandler(404, 'Listing not found.'));// response if listing not found
    }
        res.status(200).json(listing);// return listing details and  status 200
    } catch (error) {
        next(error);// send any errors to middleware
    }
};

export const getListings = async (req, res, next) => {// function to get a list of listings based on specified query parameters
    try {// extract and set default values for pagination, search, sorting and filtering parameters
        const limit = parseInt(req.query.limit) || 9;// retrieve limit of 9 listings
        const startIndex = parseInt(req.query.startIndex) || 0;// extract and set the starting index for pagination to 0
        let offer = req.query.offer;// get and set the offer filter based on the query parameter default is undefined

        if(offer === undefined || offer === 'false') {//check if the offer parameter is undefine or false
            offer = {$in: [false, true] };// set offer to filter to false and true
        }

          let furnished = req.query.furnished;//get and set the furnished  filter based on the query parameter default is undefined


        if(furnished === undefined || furnished === 'false') {//check if the furnished parameter is undefine or false
            furnished = {$in: [false, true] };
        }

        let parking = req.query.parking;

        if(parking === undefined || parking === 'false') {
            parking = {$in: [false, true] };//check if the parking parameter is undefine or false
        }

        let type = req.query.type;

        if(type === undefined || type === 'all') {//check if the type parameter is undefine or all, set to filter sale or rent
            type = {$in: ['sale', 'rent'] };
        }

        const searchTerm = req.query.searchTerm || '';// extract and set the search term  for filtering listings by name default = ''
        
        const sort = req.query.sort|| 'createAt';
        
        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            name: {$regex: searchTerm, $options: 'i'},
            offer,
            furnished,
            parking,
            type,
        })
        .sort({[sort]: order})
        .limit(limit)
        .skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};












