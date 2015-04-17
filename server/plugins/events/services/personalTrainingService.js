/**
 * personalTraining service.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var moment = require('moment');

module.exports = function(PersonalTraining, qService)
{
    return {
        /** Save personalTraining. */
        savePersonalTraining: function(personalTrainingData)
        {
            var deferred = qService.defer();
            var personalTraining = new PersonalTraining();
            //console.log(personalTrainingData);
            // Assign data.

            personalTraining.dtstart = personalTrainingData.dtstart;
            personalTraining.dtend = personalTrainingData.dtend;
            personalTraining.summary = personalTrainingData.summary;
            personalTraining.location = personalTrainingData.location;
            personalTraining.description = personalTrainingData.description;
            personalTraining.transp = personalTrainingData.transp;
            personalTraining.sequence = personalTrainingData.sequence;
            personalTraining.category = personalTrainingData.category;
            personalTraining.participants = [];
            personalTraining.course = personalTrainingData.course;
            personalTraining.creator = personalTrainingData.creator;

            //console.log(personalTrainingData.guests.length);
            for(var i=0; i<personalTrainingData.participants.length; i++)
            {
                var guest = {
                    guest : personalTrainingData.participants[i].guest,
                    status : personalTrainingData.participants[i].status
                };

                personalTraining.participants.push(guest);
            };

            personalTraining.save(function(err)
            {
                if(err)
                {
                    deferred.reject(err.message)
                }
                else
                {
                    deferred.resolve(personalTraining);
                }
            })

            return deferred.promise;
        },

        /** Delete existing personalTraining. */
        deletePersonalTraining: function(personalTrainingId)
        {
            var deferred = qService.defer();

            PersonalTraining.findOneAndRemove({_id: personalTrainingId}, function(err, personalTraining)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!personalTraining)
                {
                    deferred.reject(new Error('No personalTraining matching [personalTraining_ID] : ' + personalTrainingId + "."));
                }
                else
                {
                    deferred.resolve(personalTraining);
                }
            });

            return deferred.promise;
        },

        /** Get personalTraining's informations by personalTrainingId. */
        getPersonalTraining: function(personalTrainingId)
        {
            var deferred = qService.defer();

            PersonalTraining.findOne({_id: personalTrainingId}).populate('participants.guest course creator').exec(function (err, personalTraining)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!personalTraining)
                {
                    deferred.reject(new Error('No personalTraining matching [personalTraining_ID] : ' + personalTrainingId + "."));
                }
                else
                {
                    deferred.resolve(personalTraining);
                }
            });

            return deferred.promise;
        },

        /** Get all personalTrainings' informations. */
        getPersonalTrainings: function()
        {
            var deferred = qService.defer();

            PersonalTraining.find().populate('participants.guest course creator').exec(function (err, personalTrainings)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!personalTrainings)
                {
                    deferred.reject(new Error('No personal trainings found.'));
                }
                else
                {
                    deferred.resolve(personalTrainings);
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