(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    hideNames();
    $('#registration').change(showNames);
    $('#submit').click(buildUrl);
    $('#submit').click(calculateTotal);
    $('input, select').change(calculateTotal);
    //$('#submit').click(calculateRegistration);
    //$('#submit').click(calculateSponsorship);
    //$('#submit').click(calculateContribution);
  }

  function showNames(){
    var selected = $('#registration').find(":selected").val();
    if (selected == 'foursome'){
      $('.foursome').show(); 
    }else{
      $('.foursome').hide();
    }
  }

  function hideNames(){
    $('.foursome').hide();
  }

  function calculateRegistration(){
    var rate = getDay();
    var total = 0;
    var $registrationType = $('#registration').find(":selected").val();
    var $quantity = parseInt($('input[name=quantity]').val());
    var quantity = (isNaN($quantity)) ? 0 : $quantity;

    if ($registrationType === 'single'){
      total = rate * quantity;
    }else if ($registrationType === 'foursome'){
      total = (rate * quantity) * 4;
    }
    return total;
  }

  function calculateSponsorship(){
    var sponsorshipAmount = 0;
    var $sponsorshipValue = $('#sponsorship').find(":selected").val();
    switch ($sponsorshipValue) {
      case "platinum_golf":
        sponsorshipAmount = 1000;
        break;
      case "gold_golf":
        sponsorshipAmount = 500;
        break;
      case "silver_golf":
        sponsorshipAmount = 250;
        break;
      case "bronze_golf":
        sponsorshipAmount = 100;
        break;
      case "dinner_golf":
        sponsorshipAmount = 25;
        break;
      default:
        sponsorshipAmount = 0;
      }
      return sponsorshipAmount;
    }

  function selectSponsorship(){
    var sponsorshipType = "";
    var $sponsorshipValue = $('#sponsorship').find(":selected").val();
    switch ($sponsorshipValue) {
      case "platinum_golf":
        sponsorshipType = "Platinum Plan";
        break;
      case "gold_golf":
        sponsorshipType = "Gold Plan";
        break;
      case "silver_golf":
        sponsorshipType = "Silver Plan";
        break;
      case "bronze_golf":
        sponsorshipType = "Bronze Plan";
        break;
      case "dinner_golf":
        sponsorshipType = "Dinner";
        break;
      default:
        sponsorshipType = "";
      }
      return sponsorshipType;
    }

  function calculateContribution(){
    var $amount = parseInt($('input[name=amount]').val());
    var amount = (isNaN($amount)) ? 0 : $amount;
    return amount;
  }

  function calculateTotal(){
    var $registrationTotal = calculateRegistration();
    var $sponsorshipTotal = calculateSponsorship();
    var $contributionTotal = calculateContribution();
    var total = $registrationTotal + $sponsorshipTotal + $contributionTotal;
    $('#total').text(total);
  }

  function getDay(){
    var registrationRate = 0;
    var today = new Date();
    var earlyBird = new Date(2014, 6, 8);
    if (today <= earlyBird){
      registrationRate = 90;
    }else{
      registrationRate = 110;
    }
    return registrationRate;
  }

 
  function buildUrl(){
    var itemNumber = 0;
    var amount = calculateRegistration();
    var $registrationType = $('#registration').find(":selected").text();
    var $registrationId = $('#registration').find(":selected").val(); 
    var $quantity = parseInt($('input[name=quantity]').val());

    var $sponsorshipAmount = calculateSponsorship();
    var $sponsorshipType = selectSponsorship();
    var $sponsorshipId = $('#sponsorship').find(":selected").val();

    var $contributionAmount = calculateContribution();
    var $contributionType = $('#contribution').find(":selected").text();
    var $contributionId = $('#contribution').find(":selected").val();
    
    var url = "Registration";
    if ($registrationId !== ""){
      itemNumber ++;
      url += '&cart[items]['+itemNumber+'][amount]='+amount;
      url += '&cart[items]['+itemNumber+'][desc]='+$registrationType;
      url += '&cart[items]['+itemNumber+'][product_id]='+$registrationId;
      url += '&cart[items]['+itemNumber+'][quantity]='+$quantity;
    }
    if ($sponsorshipType !== ""){
      itemNumber ++
      url += '&cart[items]['+itemNumber+'][amount]='+$sponsorshipAmount;
      url += '&cart[items]['+itemNumber+'][desc]='+$sponsorshipType;
      url += '&cart[items]['+itemNumber+'][product_id]='+$sponsorshipId;
      url += '&cart[items]['+itemNumber+'][quantity]=1';
    }
    if ($contributionType !== ""){
      itemNumber ++
      url += '&cart[items]['+itemNumber+'][amount]='+$contributionAmount;
      url += '&cart[items]['+itemNumber+'][desc]='+$contributionType;
      url += '&cart[items]['+itemNumber+'][product_id]='+$contributionId;
      url += '&cart[items]['+itemNumber+'][quantity]=1';
    }
    console.log(url);
    return url;
  }
//Registration
//&cart[items][1][amount]=90
//&cart[items][1][desc]=Single Golfer
//&cart[items][1][product_id]=single_golfer
//&cart[items][1][quantity]=2

//&cart[items][2][amount]=1000
//&cart[items][2][desc]=Platinum Plan
//&cart[items][2][product_id]=platinum_golf
//&cart[items][2][quantity]=1

})();
