
import angular from 'angular';


function gen($q) {
  return (fn) => {
    return $q((resolve, reject) => {
      let generator, handlePromise, putInGenerator;
      generator = fn();
      putInGenerator = (method) => {
        return (val) => {
          let error;
          try {
            return handlePromise(generator[method](val));
          } catch (_error) {
            error = _error;
            return reject(error);
          }
        };
      };
      handlePromise = (arg) => {
        let done, value;
        value = arg.value; done = arg.done;
        if (done) {
          return resolve(value);
        } else if (value && value.then) {
          return value.then(putInGenerator('next'), putInGenerator('throw'));
        } else {
          return reject(Error('gen works only with promises'));
        }
      };
      return handlePromise(generator.next());
    });
  };
}

function mainGen(gen) {
  return (fn) => {
    return gen(fn).then((() => {}), (err) => {
      throw err;
    });
  };
}

function wait($timeout) {
  return (delay) => {
    return $timeout((() => {}), delay);
  };
}

gen.$inject = ['$q'];
wait.$inject = ['$timeout'];
mainGen.$inject = ['gen'];

export default angular.module('app.services.common.sagas', [])
  .factory('gen', gen)
  .factory('mainGen', mainGen)
  .factory('wait', wait)
  .name;