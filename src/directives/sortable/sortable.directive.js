/**
 * Created by smalashta on 3/29/2017.
 */
export default function Sortable(sortableConfig, $timeout, $log) {
  return {
    require:'?ngModel',
    
  }
}

Sortable.$inject = ['sortableConfig', '$timeout', '$log'];