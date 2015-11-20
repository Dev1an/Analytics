window.addEventListener( 'blur', () => Meteor.call('analytics.blurWindow')  )
window.addEventListener('focus', () => Meteor.call('analytics.focusWindow') )

FlowRouter.triggers.enter([
	context => {
		//console.log(context)
		Meteor.call('analytics.registerPageView', _.pick(context.context, 'querystring', 'hash', 'path'))
	}
])