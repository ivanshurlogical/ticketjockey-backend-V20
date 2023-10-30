const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    venueId: {
      type: String
    },
    eventId: {
      type: String
    },
    stockType: {
      type: String
    },
    host: {
      type: String,
      deafult: null
    },
    marketType: {
      type: String,
      default: 'TM'
    },
    marketSource: {
      type: String,
      default: 'TM'
    },
    ticketCode1: {
      type: String,
      default: 'TM'
    },
    ticketCode2: {
      type: String,
      default: 'TM'
    },
    groupCode:{
      type: String,
    },
    eventUrl: {
      type: String,
      default: null
    },
    is_group: {
      type: Boolean,
      default: false
    },
    is_priceMarkupPct: {
      type: Boolean,
      default: false
    },
    priceMarkupPct: {
      type: String,
      default: null
    },
    eventName: {
      type: String
    },
    eventAddress: {
      type: String
    },
    eventCountry: {
      type: String,
      default: 'US'
    },
    timeZone: {
      type: String
    },
    eventDate: {
      type: Date
    },
    eventDateUnix: {
      type: Number
    },
    localDate: {
      type: Date
    },
    localTime: {
      type: String
    },
    tmOfficialId: {
      type: String
    },
    skyBoxEventId: {
      type: Number,
      default: null
    },
    skyboxVenueId: {
      type: Number,
      default: null
    },
    performerId: {
      type: Number,
      default: null
    },
    performerName: {
      type: String,
      default: null
    },
    presales: {
      type: Array,
      default: null
    },
    blackListSection: {
      type: Array,
      default: null
    },
    blackListData: {
      type: Array,
      default: null
    },
    stubhubEventUrl: {
      type: String
    },
    stubhubEventId: {
      type: String
    },
    promos: {
      type: Object,
      default: null
    },
    unlockOffers: {
      type: Object,
      default: null
    },
    available_offers: {
      type: String
    },
    blacklistReason: {
      type: String
    },
    totalVenueSeats: {
      type: Number,
      default: null
    },
    pctVenueAvail: {
      type: Number,
      default: null
    },
    pctVenueRedAvail: {
      type: Number,
      default: null
    },
    gaAvailability: {
      type: Number,
      default: null
    },
    totalActualSeats: {
      type: Number,
      default: 0
    },
    totalGotSeats: {
      type: Number,
      default: 0
    },
    numTrackedListings: {
      type: Number
    },
    availableTicketsScraped: {
      type: Number,
      default: 0
    },
    is_broadcast: {
      type: Boolean,
      default: true
    },
    is_monitor: {
      type: Boolean,
      default: false
    },
    is_cancel: {
      type: Boolean,
      default: false
    },
    is_postponed: {
      type: Boolean,
      default: false
    },
    is_deleted: {
      type: Boolean,
      default: false
    },
    is_match: {
      type: Boolean,
      default: false
    },
    is_stage:{
      type: Boolean,
      default: false
    },
    isResale:{
      type: Boolean,
      default: false
    },
    is_JokeyAlgo: {
      type: Boolean,
      default: false
    },
    reMatched: {
      type: Boolean,
      default: false
    },
    is_blackList: {
      type: Boolean,
      default: false
    },
    is_reschedule: {
      type: Boolean,
      default: false
    },
    is_blackListCron: {
      type: Boolean,
      default: false
    },
    is_duplicate: {
      type: Boolean,
      default: false
    },
    duplicate_reason: {
      type: String,
      default: false
    },
    duplicate_by: {
      type: String,
      default: false
    },
    duplicate_date: {
      type: Date,
      default: null
    },
    onSaleDate: {
      type: Date,
      default: null
    },
    eventCancelDate: {
      type: Date,
      default: null
    },
    eventPostPondDate: {
      type: Date,
      default: null
    },
    eventRescheduleDate: {
      type: Date,
      default: null
    },
    lastKnownOnSaleTime: {
      type: Date,
      default: null
    },
    lastKnownPresaleTime: {
      type: Date,
      default: null
    },
    created_date_unix: {
      type: Number
    },
    created_date: {
      type: Date
    },
    updated_date: {
      type: Date,
      default: null
    },
    monitor_date: {
      type: Date,
      default: null
    },
    blacklist_date: {
      type: Date,
      default: null
    },
    last_monitor_date: {
      type: Date,
      default: null
    },
    deleted_date: {
      type: Date,
      default: null
    },
    reMatchDate: {
      type: Date,
      default: null
    },
    skyboxEventInfo: {
      type: Object,
      default: null
    },
    sellOnStub: {
      type: Boolean,
      default: false
    },
    removeStubNote: {
      type: Boolean,
      default: false
    },
    is_archived: {
      type: Boolean,
      default: false
    },
    is_manuallyMatch: {
      type: Boolean,
      default: false
    },
    manuallyMatch_date: {
      type: Date,
      default: null
    },
    is_eventMismatch: {
      type: Boolean,
      default: false
    },
    matchRatio: {
      type: Number,
      default: null
    },
    eventSlugName: {
      type: String,
      default: null
    },
    artistId: {
      type: Number,
      default: null
    },
    isNotPostedSB: {
      type: Boolean,
      default: false
    },
    isNotPostedSBReason: {
      type: String,
      default: null
    },
    is_unmatch_checked: {
      type: Boolean,
      default: false
    },
    blacklistedBy: {
      type: String,
    },
    unblacklistedBy: {
      type: String,
    },
    is_blacklist_archived: {
      type: Boolean,
      default: false
    },
    unblacklist_date: {
      type: Date,
      default: null
    },
    prediction_prob: {
      type: Number,
      default: null
    },
    prediction_class: {
      type: String,
      default: null
    },
    twoPlusPackSeats: {
      type: Number,
      default: 0
    },
    tmAPIAvailabilityTries: {
      type: Number,
      default: 0
    },
    updatedPredictionDate: {
      type: Date,
      default: null
    },
    ticketsPerPricePoint: {
      type: Number
    },
    classifications: {
      type: Array,
      default: null
    },
    currentPromoNames: {
      type: Array,
      default: null
    }
  },
  { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } }
);
eventSchema.index({
  venueId: 1,
  marketType: 1,
  eventId: 1,
  is_blackList: 1,
  type: 1,
  tmOfficialId: 1,
  presales: 1,
  eventDate: 1
});

eventSchema.index({
  marketType: 1,
  is_cancel: 1,
  is_deleted: 1,
  is_match: 1,
  is_postponed: 1,
  eventDate: 1
});
eventSchema.index({
  sellOnStub: 1
});
eventSchema.index({
  created_date: 1,
  is_match: 1
});
eventSchema.index({
  monitor_date: 1
});
eventSchema.index({
  is_deleted: 1,
  is_duplicate: 1,
  eventDate: -1
});

const eventModel = mongoose.model('eventModel', eventSchema, 'event');
module.exports = {
  eventModel
};
