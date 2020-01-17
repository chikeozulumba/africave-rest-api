const Subscription = require('../api/subscription/subscription.model')

const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
const moment = require('moment')

var cron = require('node-cron')

cron.schedule('* * * * *', () => {
  console.log('starts checking for valid subscriptions.')
  getSubscriptions()
}).start()

const getSubscriptions = async () => {
  const time = moment()
  const deliveryTime = time.format('HH:mm')
  const day = time.format('dddd').toLowerCase()

  const subscriptions = await Subscription.find({
    deliveryTime,
    finished: false,
    activeDays: {
      '$in': [day]
    }
  }).populate('subscriber').populate({
    path: 'course',
    populate: {
      path: 'modules'
    }
  })
  // console.log(subscriptions[0].course.modules)
  if (subscriptions.length > 0) {
    const subscription = subscriptions[0]
    const modules = subscription.course.modules
    const finished = modules.length === (subscription.courseLength + 1)
    const module = subscription.course.modules[subscription.courseLength]
    // Send message out
    const sendMessage = await twilio.messages
      .create({
        body: `Today's Module: ${subscription.course.title} - ${module.title}`,
        from: '+17035963639',
        to: subscription.subscriber.mobileNumber
      })

    console.log(sendMessage)
    // Update record
    await Subscription.update({
      _id: subscription._id
    }, {
      finished,
      courseLength: subscription.courseLength + 1
    })
    return console.log(subscription)
  } else return console.log(day + ': No subscriptions at this time ' + deliveryTime)
}
