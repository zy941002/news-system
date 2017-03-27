'use strict'
export const FIND = `FIND`
export const PUT = `PUT`
export const DELETE = `DELETE`
export const POST =	`POST`

import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
const baseUrl = 'http://120.77.37.91:8360/'

export default {
	[FIND]:async function(url,parms){
		return await Vue.resource(baseUrl+`${url}`).get(parms);
	},
	[PUT]:async function(url,parms){
		return await Vue.resource(baseUrl+`${url}`).update(parms);
	},
	[POST]:async function(url,parms){
		return await Vue.resource(baseUrl+`${url}`).save(parms);
	},
	[DELETE]:async function(url,parms){
		return await Vue.resource(baseUrl+`${url}`).remove(parms)
	}
}