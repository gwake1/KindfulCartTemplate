(function(){

  "use strict";

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    hideNames();
    $("#registration").change(showNames);
    $("#submit").click(buildUrl);
    $("#submit").click(calculateTotal);
    $("input, select").change(calculateTotal);
    $("#registration").change(setDefaultRegistrationValue);
  }

  function hideNames(){
    $(".foursome").hide();
  }

  function showNames(){
    var $selected = $("#registration").find(":selected").val();
    if ($selected === "foursome"){
      $(".foursome").show();
    }else{
      $(".foursome").hide();
    }
  }

  function getNames(){
    var names = [];
    var $names = $("input[name=names]");
    $names.each(function(index, name){
      name = $(name).val();
      if (name){
        names.push(name);
      }
    });
    names.join();
    return names;
  }

  function setDefaultRegistrationValue(){
    $("input[name=quantity]").val(1);
    calculateTotal();
  }

  function calculateRegistration(){
    var rate = getDay();
    var total = 0;
    var $registrationType = $("#registration").find(":selected").val();
    var $quantity = parseInt($("input[name=quantity]").val());
    var quantity = (isNaN($quantity)) ? 0 : $quantity;

    if ($registrationType === "single_golfer"){
      total = rate * quantity;
    }else if ($registrationType === "foursome"){
      total = (rate * quantity) * 4;
    }
    return total;
  }

  function getRegistrationAmount(){
    var rate = getDay();
    var total = 0;
    var $registrationType = $("#registration").find(":selected").val();

    if ($registrationType === "single_golfer"){
      total = rate;
    }else if ($registrationType === "foursome"){
      total = rate * 4;
    }
    return total;
  }

  function calculateSponsorship(){
    var sponsorshipAmount = 0;
    var $sponsorshipLevel = $("#sponsorship").find(":selected").val();
    switch ($sponsorshipLevel) {
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
      default:
        sponsorshipAmount = 0;
      }
      return sponsorshipAmount;
    }

  function selectSponsorship(){
    var sponsorshipType = "";
    var $sponsorshipLevel = $("#sponsorship").find(":selected").val();
    switch ($sponsorshipLevel) {
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
      default:
        sponsorshipType = "";
      }
      return sponsorshipType;
    }

  function calculateDinner(){
    var dinnerAmount = 0;
    var $amount = parseInt($("input[name=dinner_quantity]").val());
    $amount *= 25;
    dinnerAmount = (isNaN($amount)) ? 0 : $amount;
    return dinnerAmount;
  }

  function calculateAlumniContribution(){
    var alumniContribution = 0;
    var $amount = parseInt($("input[name=alumni_amount]").val());
    alumniContribution = (isNaN($amount)) ? 0 : $amount;
    return alumniContribution;
  }

  function calculateOtherContribution(){
    var otherContribution = 0;
    var $amount = parseInt($("input[name=other_amount]").val());
    otherContribution = (isNaN($amount)) ? 0 : $amount;
    return otherContribution;
  }

  function calculateTotal(){
    var registrationTotal = calculateRegistration();
    var sponsorshipTotal = calculateSponsorship();
    var dinnerTotal = calculateDinner();
    var alumniContributionTotal = calculateAlumniContribution();
    var otherContributionTotal = calculateOtherContribution();
    var total = registrationTotal + sponsorshipTotal + dinnerTotal + alumniContributionTotal + otherContributionTotal;
    $("#total").text(total);
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
    var items = 0;
    var registrationAmount = getRegistrationAmount();
    var $registrationType = $("#registration").find(":selected").text();
    var $registrationId = $("#registration").find(":selected").val();
    var $quantity = parseInt($("input[name=quantity]").val());

    var sponsorshipAmount = calculateSponsorship();
    var sponsorshipType = selectSponsorship();
    var $sponsorshipId = $("#sponsorship").find(":selected").val();

    var $dinnerQuantity = parseInt($("input[name=dinner_quantity]").val());
    var alumniContributionAmount = calculateAlumniContribution();
    var otherContributionAmount = calculateOtherContribution();
    var names = getNames();

    var url = "https://rcsf.trail-staging.us/widget?campaign_id=2834&schedule=0&success_url=http%3A//www.rochesterchristianschool.org/&cart[desc]=Golf"
    url += "Registration";
    if ($registrationType !== "" && $quantity > 0){
      items ++;
      url += "&cart[items]["+items+"][amount]="+registrationAmount;
      url += "&cart[items]["+items+"][desc]="+$registrationType;
      url += "&cart[items]["+items+"][product_id]="+$registrationId;
      url += "&cart[items]["+items+"][quantity]="+$quantity;
      if (names.length !== 0) {
        url += "&cart[items]["+items+"][notes]="+names;
      }
    }
    if (sponsorshipType !== ""){
      items ++
      url += "&cart[items]["+items+"][amount]="+sponsorshipAmount;
      url += "&cart[items]["+items+"][desc]="+sponsorshipType;
      url += "&cart[items]["+items+"][product_id]="+$sponsorshipId;
      url += "&cart[items]["+items+"][quantity]=1";
    }
    if ($dinnerQuantity > 0){
      items ++
      url += "&cart[items]["+items+"][amount]=25";
      url += "&cart[items]["+items+"][desc]=Dinner";
      url += "&cart[items]["+items+"][product_id]=dinner_golf";
      url += "&cart[items]["+items+"][quantity]="+$dinnerQuantity;
    }
    if (alumniContributionAmount > 0){
      items ++
      url += "&cart[items]["+items+"][amount]="+alumniContributionAmount;
      url += "&cart[items]["+items+"][desc]=Alumni Contribution";
      url += "&cart[items]["+items+"][product_id]=alumni_contribution";
      url += "&cart[items]["+items+"][quantity]=1";
    }
    if (otherContributionAmount > 0){
      items ++
      url += "&cart[items]["+items+"][amount]="+otherContributionAmount;
      url += "&cart[items]["+items+"][desc]=Other Contribution";
      url += "&cart[items]["+items+"][product_id]=other_contribution";
      url += "&cart[items]["+items+"][quantity]=1";
    }
    if (items > 0){
      alert(url);
      window.location.href = url;
    }
  }

})();
