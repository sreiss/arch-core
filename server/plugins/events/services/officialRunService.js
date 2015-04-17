/**
 * OfficialRun service.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var moment = require('moment');

module.exports = function(OfficialRun, qService)
{
    return {
        /** Save OfficialRun. */
        saveOfficialRun: function(officialRunData)
        {
            var deferred = qService.defer();
            var officialRun = new OfficialRun();
            //console.log(OfficialRunData);
            // Assign data.

            officialRun.dtstart = officialRunData.dtstart;
            officialRun.dtend = officialRunData.dtend;
            officialRun.summary = officialRunData.summary;
            officialRun.location = officialRunData.location;
            officialRun.description = officialRunData.description;
            officialRun.transp = officialRunData.transp;
            officialRun.sequence = officialRunData.sequence;
            officialRun.category = officialRunData.category;
            officialRun.participants = [];
            officialRun.website = officialRunData.website;
            officialRun.information = officialRunData.information;
            officialRun.trainings = [];
            officialRun.course = officialRunData.course;

            //console.log(OfficialRunData.guests.length);
            for(var i=0; i<officialRunData.participants.length; i++)
            {
                var guest = {
                    guest : officialRunData.participants[i].guest,
                    status : officialRunData.participants[i].status

                };

                officialRun.participants.push(guest);
            };

            for(var j=0; j<officialRunData.trainings.length; j++)
            {
                var training = {
                    training : officialRunData.trainings[i].training

                };

                officialRun.trainings.push(training);
            };

            officialRun.save(function(err)
            {
                if(err)
                {
                    deferred.reject(err.message)
                }
                else
                {
                    deferred.resolve(OfficialRun);
                }
            })

            return deferred.promise;
        },

        /** Delete existing OfficialRun. */
        deleteOfficialRun: function(officialRunId)
        {
            var deferred = qService.defer();

            OfficialRun.findOneAndRemove({_id: officialRunId}, function(err, officialRun)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!officialRun)
                {
                    deferred.reject(new Error('No Official Run matching [officialRun_ID] : ' + officialRunId + "."));
                }
                else
                {
                    deferred.resolve(officialRun);
                }
            });

            return deferred.promise;
        },

        /** Get OfficialRun's informations by OfficialRunId. */
        getOfficialRun: function(officialRunId)
        {
            var deferred = qService.defer();

            OfficialRun.findOne({_id: officialRunId}).populate('participants.guest trainings.training course').exec(function (err, officialRun)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(officialRun);
                }
            });

            return deferred.promise;
        },

        /** Get all OfficialRuns' informations. */
        getOfficialRuns: function()
        {
            var deferred = qService.defer();

            OfficialRun.find().populate('participants.guest trainings.training course').exec(function (err, officialRuns)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!officialRuns)
                {
                    deferred.reject(new Error('No Official Runs found.'));
                }
                else
                {
                    deferred.resolve(officialRuns);
                }
            });

            return deferred.promise;
        }
        //,
        //
        //getGuests: function()
        //{
        //
        //},
        //
        //deleteGuest: function()
        //{}
    };
};