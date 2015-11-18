window.addEventListener( 'blur', () => Meteor.call('analytics.blurWindow')  )
window.addEventListener('focus', () => Meteor.call('analytics.focusWindow') )