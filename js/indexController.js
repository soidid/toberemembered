taiwanControllers.controller('indexCtrl', ['$scope', '$http','$location', '$firebase', function($scope, $http, $location, $firebase){
  
  
  /*
  $http.get('../story.json')
       .then(function(res){
          $scope.data = res.data;                
        });
  */
  $(document).ready(function() {
   
  });
 
  $scope.dbRef = new Firebase('https://taiwan324.firebaseio.com/story');
  /*
  $scope.dbRef.on('value', function(snapshot) {
       $scope.data = snapshot.val();
       $scope.$apply();
  });*/
  $scope.data = [];
  function addItem($scope, it) {
   //console.log(it);
   setTimeout(function(){$scope.$apply(function() {$scope.data.unshift(it);});}, 0);
  }
  $scope.dbRef.on("child_added", function(d) {
     v = d.val();
     addItem($scope, v);
  });

  $scope.newData = {};
  $scope.submit = function(){
  	//console.log($scope.newData.content);
    var r = confirm("確定送出？");
    if (r == true){
        $scope.newData.content = $scope.newData.content.split("\n");
        $scope.dbRef.push($scope.newData);
        $scope.newData = {};
    }else{}
    
  };
  $scope.showForm = false;
  $scope.toggleForm = function(event){
    //console.log(event.target);
    if($scope.showForm){
       $("#form").hide();
       $scope.showForm = false;
       $(event.target).removeClass('active');

    }else{
        $("#form").show();
        $scope.showForm = true;
        $(event.target).addClass('active');
       
    }

  };
  

}]);
