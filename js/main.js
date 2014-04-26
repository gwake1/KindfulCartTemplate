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
      case "dinner_golf":
        sponsorshipType = "Dinner";
        break;
      default:
        sponsorshipType = "";
      }
      return sponsorshipType;
    }

  function calculateContribution(){
    var $amount = parseInt($("input[name=amount]").val());
    var amount = (isNaN($amount)) ? 0 : $amount;
    return amount;
  }

  function calculateTotal(){
    var registrationTotal = calculateRegistration();
    var sponsorshipTotal = calculateSponsorship();
    var contributionTotal = calculateContribution();
    var total = registrationTotal + sponsorshipTotal + contributionTotal;
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
    var registrationAmount = calculateRegistration();
    var $registrationType = $("#registration").find(":selected").text();
    var $registrationId = $("#registration").find(":selected").val();
    var $quantity = parseInt($("input[name=quantity]").val());

    var sponsorshipAmount = calculateSponsorship();
    var sponsorshipType = selectSponsorship();
    var $sponsorshipId = $("#sponsorship").find(":selected").val();

    var $contributionAmount = calculateContribution();
    var $contributionType = $("#contribution").find(":selected").text();
    var $contributionId = $("#contribution").find(":selected").val();

    var names = getNames();

    var url = "https://rcsf.trail-staging.us/widget?campaign_id=2834&schedule=0&success_url=http%3A//www.rochesterchristianschool.org/&cart[desc]=Golf"
    url += "Registration";
    if ($registrationType !== ""){
      items ++;
      url += "&cart[items]["+items+"][amount]="+registrationAmount;
      url += "&cart[items]["+items+"][desc]="+$registrationType;
      url += "&cart[items]["+items+"][product_id]="+$registrationId;
      url += "&cart[items]["+items+"][quantity]="+$quantity;
      url += "&cart[items]["+items+"][names]="+names;
    }
    if (sponsorshipType !== ""){
      items ++
      url += "&cart[items]["+items+"][amount]="+sponsorshipAmount;
      url += "&cart[items]["+items+"][desc]="+sponsorshipType;
      url += "&cart[items]["+items+"][product_id]="+$sponsorshipId;
      url += "&cart[items]["+items+"][quantity]=1";
    }
    if ($contributionType !== ""){
      items ++
      url += "&cart[items]["+items+"][amount]="+$contributionAmount;
      url += "&cart[items]["+items+"][desc]="+$contributionType;
      url += "&cart[items]["+items+"][product_id]="+$contributionId;
      url += "&cart[items]["+items+"][quantity]=1";
    }
    window.location.href = url;
  }

})();
