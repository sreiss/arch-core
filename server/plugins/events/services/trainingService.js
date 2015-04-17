/**
 * training service.
 *
 * @module arch/events
 * @copyright ArchTailors 2015
 */

var moment = require('moment');

module.exports = function(Training, qService)
{
    return {
        /** Save training. */
        saveTraining: function(trainingData)
        {
            var deferred = qService.defer();
            var training = new Training();

            // Assign data.
            training.dtstart = trainingData.dtstart;
            training.dtend = trainingData.dtend;
            training.summary = trainingData.summary;
            training.location = trainingData.location;
            training.description = trainingData.description;
            training.transp = trainingData.transp;
            training.sequence = trainingData.sequence;
            training.category = trainingData.category;
            training.participants = [];
            training.program = trainingData.program;
            training.runs = [];
            training.course = trainingData.course;

            //console.log(trainingData.guests.length);
            for(var i=0; i<trainingData.participants.length; i++)
            {
                var guest = {
                    guest : trainingData.participants[i].guest,
                    status : trainingData.participants[i].status
                };

                training.participants.push(guest);
            };


            for(var j=0; j<trainingData.runs.length; j++)
            {
                var run = {
                    run : trainingData.runs[i].run

                };

                training.trainings.push(run);
            };


            training.save(function(err)
            {
                if(err)
                {
                    deferred.reject(err.message)
                }
                else
                {
                    deferred.resolve(training);
                }
            })

            return deferred.promise;
        },

        /** Delete existing training. */
        deleteTraining: function(trainingId)
        {
            var deferred = qService.defer();

            Training.findOneAndRemove({_id: trainingId}, function(err, training)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!training)
                {
                    deferred.reject(new Error('No training matching [training_ID] : ' + trainingId + "."));
                }
                else
                {
                    deferred.resolve(training);
                }
            });

            return deferred.promise;
        },

        /** Get training's informations by trainingId. */
        getTraining: function(trainingId)
        {
            var deferred = qService.defer();

            Training.findOne({_id: trainingId}).populate('participants.guest runs.run course').exec(function (err, training)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!training)
                {
                    deferred.reject(new Error('No training matching [training_ID] : ' + trainingId + "."));
                }
                else
                {
                    deferred.resolve(training);
                }
            });

            return deferred.promise;
        },

        /** Get all trainings' informations. */
        getTrainings: function()
        {
            var deferred = qService.defer();

            Training.find().populate('participants.guest runs.run course').exec(function (err, trainings)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!trainings)
                {
                    deferred.reject(new Error('No personal trainings found.'));
                }
                else
                {
                    deferred.resolve(trainings);
                }
            });

            return deferred.promise;
        }
    };
};