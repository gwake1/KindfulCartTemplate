(function(){

  "use strict";

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $("#submit").click(buildUrl);
    $("#submit").click(calculateTotal);
    $("input, select").change(calculateTotal);
    $("#registration").change(setDefaultRegistrationValue);
  }

  function setDefaultRegistrationValue(){
    $("input[name=quantity]").val(1);
    calculateTotal();
  }

  function calculateRegistration(){
    var rate = 175;
    var total = 0;
    var quantity = $("#registration").find(":selected").val();

    total = rate * quantity;

    return total;
  }

  function calculateSponsorship(){
    var sponsorshipAmount = 0;
    var $sponsorshipLevel = $("#sponsorship").find(":selected").val();
    switch ($sponsorshipLevel) {
      case "platinum_level":
        sponsorshipAmount = 1000;
        break;
      case "gold_level":
        sponsorshipAmount = 500;
        break;
      case "silver_level":
        sponsorshipAmount = 250;
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
      case "platinum_level":
        sponsorshipType = "Platinum Plan";
        break;
      case "gold_level":
        sponsorshipType = "Gold Plan";
        break;
      case "silver_level":
        sponsorshipType = "Silver Plan";
        break;
      default:
        sponsorshipType = "";
      }
      return sponsorshipType;
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
    var otherContributionTotal = calculateOtherContribution();
    var total = registrationTotal + sponsorshipTotal + otherContributionTotal;
    $("#total").text(total);
  }

  function buildUrl(){
    var items = 0;
    var registrationAmount = 175;
    var $registrationType = $("#registration").find(":selected").text();
    var $registrationId = $("#registration").find(":selected").data('product-id');
    var $quantity = $("#registration").find(":selected").val();

    var sponsorshipAmount = calculateSponsorship();
    var sponsorshipType = selectSponsorship();
    var $sponsorshipId = $("#sponsorship").find(":selected").val();

    var otherContributionAmount = calculateOtherContribution();

    var url = "http://sacenter.lvh.me:3000/widget?campaign_id=4293&schedule=0&success_url=http%3A//www.sacenter.org//&cart[desc]=Mad"
    url += " Hatter 2014";
    if ($quantity > 0){
      items ++;
      url += "&cart[items]["+items+"][amount]="+registrationAmount;
      url += "&cart[items]["+items+"][desc]=Mad Hatter Ticket"
      url += "&cart[items]["+items+"][product_id]=mad_hatter_ticket"
      url += "&cart[items]["+items+"][quantity]="+$quantity;
    }
    if (sponsorshipType !== ""){
      items ++
      url += "&cart[items]["+items+"][amount]="+sponsorshipAmount;
      url += "&cart[items]["+items+"][desc]="+sponsorshipType;
      url += "&cart[items]["+items+"][product_id]="+$sponsorshipId;
      url += "&cart[items]["+items+"][quantity]=1";
    }
    if (otherContributionAmount > 0){
      items ++
      url += "&cart[items]["+items+"][amount]="+otherContributionAmount;
      url += "&cart[items]["+items+"][desc]=Additional Donation";
      url += "&cart[items]["+items+"][product_id]=additional_donation";
      url += "&cart[items]["+items+"][quantity]=1";
    }
    if (items > 0){
      window.location.href = url;
    }
  }

})();
