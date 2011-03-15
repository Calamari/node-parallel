/**
 * Module that allows to (pseudo) parallelize async requests
 */
module.exports = function() {
	var aSyncInProgress = 0,
		results = {},
		runIt = null;
	return {
		recv: function() {
			++aSyncInProgress;
			var recievers = [];
			for(var i=0,l=arguments.length; i<l; ++i) {
				recievers.push(arguments[i]);
			}
			return function() {
				for(var i=0,l=recievers.length; i<l; ++i) {
					results[recievers[i]] = arguments[i] || undefined;
				}
				--aSyncInProgress;
				/** if run was called already */
				!aSyncInProgress && runIt && runIt(results);

			}
		},
		run: function(callback) {
			if(!aSyncInProgress) {
				callback(results);
			}
			runIt = callback;
		}
	}
}
