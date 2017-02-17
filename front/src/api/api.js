'use strict'
export const FIND = `FIND`
export const UPDATE = `PUT`
export const DELETE = `DELETE`
export const POST =	`POST`

import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
const baseUrl = 'http://localhost:8360/'

export default {
	[FIND]:function(url,parms){
		return Vue.resource(baseUrl+`${url}`).get(parms);
	},
	[UPDATE]:function(url,parms){
		return Vue.resource(baseUrl+`${url}`).update(parms);	
	}
}