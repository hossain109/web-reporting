/** declaration variables global */
let updateYear = 9;
for (index = 2023; index < new Date().getFullYear(); index++) {
      updateYear += 1;
}
//console.log(updateYear)
/** declaration variables global */
let questionId = "";
let targetIdValue = "";
let aneeId = "";
let menuId = "";
let paragraph = document.querySelector(".paragraph");
let section = document.querySelector("section");
let targetTypeId = "";
//all targets for label
let tousLesTargets = [];
//function global anneId
function anne(value) {
      aneeId = value;
      return aneeId;
}
let currentYear = new Date().getFullYear();

//function gloabl menuId
function menu(value) {
      menuId = value;
      return menuId;
}
/** create global question id */
function getQuestionId(value) {
      questionId = value;
      return questionId;
}
/** create global target value  */
function getTergetValue(value) {
      targetIdValue = value;
      return targetIdValue;
}
/** create global target Type value */
function getTargetTypeValue(value) {
      targetTypeId = value;
      return targetTypeId;
}

//program start from here when document ready
$(document).ready(function () {
      //By default hide top menu
      document.querySelector("#top_menu").style.display = "none";
      //load target data by default depend target type
      loadTarget();
      //load target data after change target type
      $("#targettype_id").on('change', function () {
            loadTarget();
            //recover value for by target
            if ($("#bytarget").hasClass("active")) {
                  targetTypeId = $("#targettype_id").val();
                  getTargetTypeValue(targetTypeId);
                  requestresponseByTarget(questionId, aneeId, targetTypeId);
            }
      })
      //action on default value and click on question event
      $('.question').click(function () {
            //initially empty section
            section.innerHTML = "";
            //when click on question hide peride but if top menu select by target display periode
            //note: by default form-floating take first child
            if ($("#bytarget").hasClass("active")) { document.querySelector(".form-floating").style.display = "block"; }
            else document.querySelector(".form-floating").style.display = "none";
            //select question id
            //when click on question display graph type
            document.querySelector("#displayTypeGraph").style.display = "block";
            //when click on quetion display top menu
            document.querySelector("#top_menu").style.display = "flex";
            //find out question id
            questionId = this.getAttribute("data-index");
            getQuestionId(questionId);
            //find out target selected value
            targetIdValue = $("#target_id").find(":selected").val();
            getTergetValue(targetIdValue);
            //find out year
            aneeId = $("#period_id").val();
            anne(aneeId);
            //call function if active class on by target si non call by evolution
            if ($("#bytarget").hasClass("active")) {
                  requestresponseByTarget(questionId, aneeId, targetTypeId);
            }
            if ($("#inevolution").hasClass("active")) {
                  //call function for send request response
                  requestresponse(questionId, targetIdValue);
            }

      })

      //action onchange target type and click question
      $("#target_id").change(function () {
            targetIdValue = $("#target_id").val();
            getTergetValue(targetIdValue);
            //condition when year is not visible
            if ($('#first_div:visible').length == 0) {
                  requestresponse(questionId, targetIdValue)
            } else {
                  resquestresponseMenu(menuId, targetIdValue, aneeId);
            }

      })
      /**action on menu */
      //onchange year/periode
      $("#period_id").change(function () {
            aneeId = $("#period_id").val();
            anne(aneeId);
            //call function if active class on by target si non call by evolution
            if ($("#bytarget").hasClass("active")) {
                  requestresponseByTarget(questionId, aneeId, targetTypeId);
            } else {
                  resquestresponseMenu(menuId, targetIdValue, aneeId);
            }

      })

      //onclick menu display result
      $(".menu").click(function () {
            //empty paragraph when click on menu
            paragraph.innerHTML = "";
            section.innerHTML = "";
            //when click on menu display period
            document.querySelector(".form-floating").style.display = "block";
            //when click on menu graph type display none
            document.querySelector("#displayTypeGraph").style.display = "none";
            //when click on menu hide top menu
            document.querySelector("#top_menu").style.display = "none";
            //when click on menu display target
            document.querySelector("#third_div").style.display = "block";
            menuId = this.getAttribute("data-index");
            menu(menuId);
            //hide change color
            $('.colorsDropdown').hide();
            targetIdValue = $("#target_id").find(":selected").val();
            aneeId = $("#period_id").val();
            anne(aneeId);
            //if click on menu add active class on inevolution
            if ($("#bytarget").hasClass("active")) {
                  $("#bytarget").removeClass("active");
                  $("#inevolution").addClass("active");
                  resquestresponseMenu(menuId, targetIdValue, aneeId)
            } else resquestresponseMenu(menuId, targetIdValue, aneeId)
      })
      //active and remove class in question
      $(".question").click(function () {

            if ($('.question').hasClass('activequestion')) {
                  $('.question').removeClass("activequestion");
                  $(this).addClass("activequestion");
            } else {
                  $(this).addClass("activequestion");
            }

      });

      //active and remove class in menu and collapse menu
      $(".menu").click(function () {
            if ($('.collapse').hasClass("show")) {
                  $('.collapse').removeClass("show")
            }
            if ($('.menu').hasClass('activemenu')) {
                  $('.menu').removeClass("activemenu");
                  $(this).addClass("activemenu");
                  $('.collapse').next().removeClass("show");
            } else {
                  $(this).addClass("activemenu");
                  $('.collapse').next().addClass("show");
            }

      });
      //top menu slected
      $(".top-menu").click(function () {
            if ($('.top-menu').hasClass('active')) {
                  $('.top-menu').removeClass("active");
                  $(this).addClass("active");
            } else {
                  $(this).addClass("active");
            }
      })
      //footer year
      $("#footerYear").text(new Date().getFullYear());
})
//load target data dynamiquely when change target Type
function loadTarget() {
      var targetTypeValue = $("#targettype_id").val();

      //send request target change
      $.ajax({
            url: 'data.php',
            method: 'POST',
            data: 'targetId=' + targetTypeValue
            //receive response
      }).done(function (targets) {
            targets = JSON.parse(targets);
            //empty for each target before target loaded
            $('#target_id').empty();
            targets.forEach(function (target) {
                  $('#target_id').append($('<option>', {
                        value: target.code_cible,
                        text: target.lib_cible_app,
                  }))
            })
            //action on onchange target type
            targetIdValue = $("#target_id").val();
            getTergetValue(targetIdValue);

            if ($('#first_div:visible').length == 0) {
                  requestresponse(questionId, targetIdValue)
            }
            if (($('#first_div:visible').length == 1) && ($('#third_div:visible').length == 1)) {
                  resquestresponseMenu(menuId, targetIdValue, aneeId);

            }
      })
}
/* function send request and receive response with 2 parameters when select question*/
function requestresponse(questionId, targetIdValue) {
      $.ajax({
            url: "data.php",
            method: 'GET',
            data: { questionId: questionId, targetIdValue: targetIdValue }
      }).done(function (values) {

            values = JSON.parse(values);
            //paragraph inside text empty
            paragraph.innerHTML = ""
            //functionality on graph type by in evolution
            if ($("#inevolution").hasClass("active")) {
                  //calling function by type of graph
                  //call bar graph
                  $('.barres').click(function () {
                        //checking class actual
                        if ($('.line').hasClass('actual'))
                              $('.line').removeClass('actual');
                        if ($('.table').hasClass('actual'))
                              $('.table').removeClass('actual');
                        if ($('.pie').hasClass('actual'))
                              $('.pie').removeClass('actual');
                        //checking picto image
                        if ($('.lineList').hasClass('picto'))
                              $('.lineList').removeClass('picto')
                        if ($('.tableList').hasClass('picto'))
                              $('.tableList').removeClass('picto');
                        if ($('.pieList').hasClass('picto'))
                              $('.pieList').removeClass('picto');
                        //add picto(image) class
                        $('.barresList').addClass('picto');
                        $('.barres').addClass('actual');
                        displayBar(values);

                  })
                  //call line graph
                  $('.line').click(function () {
                        //checking class actual
                        if ($('.barres').hasClass('actual'))
                              $('.barres').removeClass('actual');
                        if ($('.table').hasClass('actual'))
                              $('.table').removeClass('actual');
                        if ($('.pie').hasClass('actual'))
                              $('.pie').removeClass('actual');
                        //checking picto image
                        if ($('.barresList').hasClass('picto'))
                              $('.barresList').removeClass('picto')
                        if ($('.tableList').hasClass('picto'))
                              $('.tableList').removeClass('picto');
                        if ($('.pieList').hasClass('picto'))
                              $('.pieList').removeClass('picto');
                        //add  picto(image) class
                        $('.lineList').addClass('picto');
                        $('.line').addClass('actual');
                        displayLine(values);

                  })
                  //call table graph
                  $('.table').click(function () {
                        //add class actual
                        if ($('.line').hasClass('actual'))
                              $('.line').removeClass('actual');
                        if ($('.barres').hasClass('actual'))
                              $('.barres').removeClass('actual');
                        if ($('.pie').hasClass('actual'))
                              $('.pie').removeClass('actual');
                        //checking picto image
                        if ($('.barresList').hasClass('picto'))
                              $('.barresList').removeClass('picto')
                        if ($('.lineList').hasClass('picto'))
                              $('.lineList').removeClass('picto');
                        if ($('.pieList').hasClass('picto'))
                              $('.pieList').removeClass('picto');
                        //add picto(image) class
                        $('.tableList').addClass('picto');
                        $('.table').addClass('actual');
                        displayTable(values);

                  })
                  //call pie chart
                  $('.pie').click(function () {
                        //add class actual
                        if ($('.line').hasClass('actual'))
                              $('.line').removeClass('actual');
                        if ($('.barres').hasClass('actual'))
                              $('.barres').removeClass('actual');
                        if ($('.table').hasClass('actual'))
                              $('.table').removeClass('actual');
                        //checking picto image
                        if ($('.barresList').hasClass('picto'))
                              $('.barresList').removeClass('picto')
                        if ($('.lineList').hasClass('picto'))
                              $('.lineList').removeClass('picto');
                        if ($('.tableList').hasClass('picto'))
                              $('.tableList').removeClass('picto');
                        //add picto(image) class
                        $('.pieList').addClass('picto');
                        $('.pie').addClass('actual');
                        displayPie(values);

                  })
            }

            //calling function depend on actual class
            if ($('.barres').hasClass('actual')) {
                  displayBar(values);
            }
            if ($('.line').hasClass('actual')) {
                  displayLine(values);
            }
            if ($('.table').hasClass('actual')) {
                  displayTable(values);
            }
            if ($('.pie').hasClass('actual')) {
                  displayPie(values);
            }
      });

}

//request response when click on menu , target change, periode change with three parameters
function resquestresponseMenu(menuId, targetIdValue, aneeId) {
      $.ajax({
            url: "data.php",
            method: 'GET',
            data: { menuId: menuId, targetIdValue: targetIdValue, aneeId: aneeId }
      }).done(function (values) {
            values = JSON.parse(values);
            //delete all graph id if existe for menu
            if ($('*[id^="chart"]').val() != null) {
                  $('*[id^="chart"]').remove();
            }
            //delete all class(graph) if existe
            if ($('*[class^="graph"]').val() != null) {
                  $('*[class^="graph"]').remove();
            }
            values.forEach(function (value, index) {

                  anees = value['code_periode'].split("|");
                  //year convert into recent year
                  anees = anees.map(function (x) { return parseInt(anees) + updateYear })
                  reponses = value['reponses'].split("|");
                  datas = value['resul'].split("|");

                  //question app
                  questionApp = value['lib_questions_app'].split("|");
                  //avg filter
                  average = datas.filter(function (x) { return x > 1; })
                  //data filter
                  data = datas.filter(function (x) { return x < 1; })
                  //data convert in percentage
                  data = data.map(function (x) { return x < 1 ? Math.round(x * 100) : x * 1 })


                  div = document.createElement("div");
                  div.classList.add('graph');
                  question = document.createElement("p");
                  question.classList.add('paragraph')
                  question.innerHTML = questionApp;
                  div.appendChild(question)
                  canvas = document.createElement('canvas');
                  div.appendChild(canvas);
                  chartId = 'chart' + index;
                  canvas.id = chartId;

                  //average
                  textAverage = document.createElement("p");
                  textAverage.classList.add('average');

                  if (average > 1) {
                        textAverage.innerHTML = "Average " + average;
                  } else {
                        textAverage.innerHTML = "";
                  }
                  div.append(textAverage);
                  content = document.querySelector("section");
                  content.appendChild(div);
                  context = document.getElementById(chartId);


                  const chartOptionsBar = {
                        type: 'bar',
                        data: {
                              labels: anees,
                              datasets: [

                              ]
                        },
                        options: {
                              indexAxis: 'y',
                              responsive: true,
                              maintainAspectRatio: false,
                              scales: {
                                    x: {
                                          stacked: true,
                                    },
                                    y: {
                                          stacked: true
                                    }
                              },

                        }
                  }
                  data.forEach((element, index) => {
                        chartOptionsBar.data.datasets.push({
                              data: [element],
                              label: [reponses[index]],

                        })
                  })
                  canvas.parentNode.style.height = '100px';
                  const displayBarChartWithMenu = new Chart(context, chartOptionsBar);

            })
      })
}
//request response by target when click on question , target type, periode change with three parameters
$("#bytarget").click(function () {
      //console.log("clicked")
      //when click on question display peride
      document.querySelector(".form-floating").style.display = "block";
      //when click on question hide target
      document.querySelector("#third_div").style.display = "none";
      //document.querySelector(".target-floating").style.display = "none";

      targetTypeId = $("#targettype_id").val();
      getTargetTypeValue(targetTypeId);
      //find out year
      aneeId = $("#period_id").val();
      anne(aneeId);

      requestresponseByTarget(questionId, aneeId, targetTypeId);
})
$("#inevolution").click(function () {
      //when click on question hide peride
      document.querySelector(".form-floating").style.display = "none";
      //when click on question display target
      document.querySelector("#third_div").style.display = "block";
      //call function for send request response
      requestresponse(questionId, targetIdValue);

})
//functionality request response by target with 3 parameters
function requestresponseByTarget(questionId, aneeId, targetTypeId) {
      $.ajax({
            url: 'data.php',
            method: 'GET',
            data: { questionId: questionId, aneeId: aneeId, targetTypeId: targetTypeId }
      }).done(function (values) {
            values = JSON.parse(values);
            //console.log(values);
            if ($("#bytarget").hasClass("active")) {
                  //calling function by type of graph
                  //call bar graph
                  $('.barres').click(function () {
                        //checking class actual
                        if ($('.line').hasClass('actual'))
                              $('.line').removeClass('actual');
                        if ($('.table').hasClass('actual'))
                              $('.table').removeClass('actual');
                        if ($('.pie').hasClass('actual'))
                              $('.pie').removeClass('actual');
                        //checking picto image
                        if ($('.lineList').hasClass('picto'))
                              $('.lineList').removeClass('picto')
                        if ($('.tableList').hasClass('picto'))
                              $('.tableList').removeClass('picto');
                        if ($('.pieList').hasClass('picto'))
                              $('.pieList').removeClass('picto');
                        //add picto(image) class
                        $('.barresList').addClass('picto');
                        $('.barres').addClass('actual');
                        displayBar(values);

                  })
                  //call line graph
                  $('.line').click(function () {
                        //checking class actual
                        if ($('.barres').hasClass('actual'))
                              $('.barres').removeClass('actual');
                        if ($('.table').hasClass('actual'))
                              $('.table').removeClass('actual');
                        if ($('.pie').hasClass('actual'))
                              $('.pie').removeClass('actual');
                        //checking picto image
                        if ($('.barresList').hasClass('picto'))
                              $('.barresList').removeClass('picto')
                        if ($('.tableList').hasClass('picto'))
                              $('.tableList').removeClass('picto');
                        if ($('.pieList').hasClass('picto'))
                              $('.pieList').removeClass('picto');
                        //add  picto(image) class
                        $('.lineList').addClass('picto');
                        $('.line').addClass('actual');
                        displayLine(values);
                        // console.log(values);

                  })
                  //call table graph
                  $('.table').click(function () {
                        //add class actual
                        if ($('.line').hasClass('actual'))
                              $('.line').removeClass('actual');
                        if ($('.barres').hasClass('actual'))
                              $('.barres').removeClass('actual');
                        if ($('.pie').hasClass('actual'))
                              $('.pie').removeClass('actual');
                        //checking picto image
                        if ($('.barresList').hasClass('picto'))
                              $('.barresList').removeClass('picto')
                        if ($('.lineList').hasClass('picto'))
                              $('.lineList').removeClass('picto');
                        if ($('.pieList').hasClass('picto'))
                              $('.pieList').removeClass('picto');
                        //add picto(image) class
                        $('.tableList').addClass('picto');
                        $('.table').addClass('actual');
                        displayTable(values);

                  })
                  //call pie grpah
                  //call table graph
                  $('.pie').click(function () {
                        //add class actual
                        if ($('.line').hasClass('actual'))
                              $('.line').removeClass('actual');
                        if ($('.barres').hasClass('actual'))
                              $('.barres').removeClass('actual');
                        if ($('.table').hasClass('actual'))
                              $('.table').removeClass('actual');
                        //checking picto image
                        if ($('.barresList').hasClass('picto'))
                              $('.barresList').removeClass('picto')
                        if ($('.lineList').hasClass('picto'))
                              $('.lineList').removeClass('picto');
                        if ($('.tableList').hasClass('picto'))
                              $('.tableList').removeClass('picto');
                        //add picto(image) class
                        $('.pieList').addClass('picto');
                        $('.pie').addClass('actual');
                        displayPie(values);

                  })
            }
            //calling function depend on actual class
            if ($('.barres').hasClass('actual')) {
                  displayBar(values);
            }
            if ($('.line').hasClass('actual')) {
                  displayLine(values);
            }
            if ($('.table').hasClass('actual')) {
                  displayTable(values);
            }
            if ($('.pie').hasClass('actual')) {
                  displayPie(values);
            }
      })
}


//function for display Table Chart
function displayTable(values) {
      //declaration and initialization array
      let allArrayData = [];
      let allAverage = [];
      let allAnee = [];
      let tousLesTargets = [];

      $('.colorsDropdown').hide();

      //delete all graph id if existe for question
      if ($('*[id^="chart"]').val() != null) {
            $('*[id^="chart"]').remove();
      }
      //delete all class(graph) if existe
      if ($('*[class^="graph"]').val() != null) {
            $('*[class^="graph"]').remove();
      }
      values.forEach(function (value, index) {
            anees = value['code_periode'].split("|");
            //year convert into recent year
            anees = anees.map(function (x) { return parseInt(anees) + updateYear })
            allAnee.push(anees);
            target = value['lib_cible_app'];
            tousLesTargets.push(target);
            reponses = value['reponses'].split("|");
            reponses[reponses.length - 1] == "Average" ? reponses.pop() : reponses;
            datas = value['resul'].split("|");
            questionApp = value['lib_questions_app'].split("|");
            paragraph.innerHTML = questionApp;
            //avg filter
            average = datas.filter(function (x) { return x > 1; })
            allAverage.push(average);
            //console.log('averagelength' + allAverage.length);
            //data filter
            data = datas.filter(function (x) { return x < 1; })
            //label
            //data convert in percentage
            data = data.map(function (x) { return x < 1 ? Math.round(x * 100) : x * 1 })
            allArrayData.push(data);

      })
      //delete old table if existe
      if ($('table').length != null) { $('table').remove(); }
      //call function table create
      tableCreate(allAnee, reponses, allArrayData, allAverage, tousLesTargets);
}
//function create table
function tableCreate(allAnee, reponses, allArrayData, allAverage, tousLesTargets) {
      //convert data in table Graph
      let resultArr = [];
      //condition for if all array length is one (specially for national)
      if (allArrayData.length > 1) {
            for (let i = 0; i <= allArrayData.length; i++) {
                  let res = [];
                  allArrayData.forEach((arr) => {
                        res.push(arr[i]);
                  });
                  resultArr.push(res);
            }
      } else {
            resultArr = allArrayData;
      }

      $('.table-responsive').remove();
      let tableDiv = document.createElement('div');
      tableDiv.classList.add('table-responsive');


      // Main elements of table
      $table = $("<table>", {
            'border': '3',
            "width": '90%',
            'class': 'mx-auto table table-hover table-bordered text-center '

      });
      $thead = $("<thead>", {
            'class': 'bg-light mt-2 mb-2'
      });
      $tbody = $("<tbody>");

      //add first default header column for resul 
      $thead.append($('<th>', {
            'scope': "col",
            'text': ""
      }));
      // Add headers with year
      if ($("#inevolution").hasClass("active")) {
            for (headerNum = 0; headerNum < allAnee.length; headerNum++) {
                  $thead.append($('<th>', {
                        'scope': "col",
                        'text': allAnee[headerNum]
                  }));

            }
      }
      //table header by target
      if ($("#bytarget").hasClass("active")) {
            for (headerNum = 0; headerNum < tousLesTargets.length; headerNum++) {
                  $thead.append($('<th>', {
                        'scope': "col",
                        'text': tousLesTargets[headerNum]
                  }));

            }
      }
      // Add some rows with data
      if (allArrayData.length > 1) {
            for (rowCount = 0; rowCount < resultArr.length; rowCount++) {
                  //check value is undefined or not
                  checkValueInArray = resultArr[rowCount].every(item => item != undefined);
                  if (checkValueInArray) {
                        newTr = $('<tr>');
                        //add default column
                        newTr.append($('<td>', {
                              'text': reponses[rowCount],
                        }));
                        for (rowColumnCount = 0; rowColumnCount < resultArr[rowCount].length; rowColumnCount++) {
                              newTr.append($('<td>', {
                                    'text': resultArr[rowCount][rowColumnCount],
                              }));

                        }
                        //add each row in body
                        $tbody.append(newTr);
                  }
            }
      } else {
            //if one array table (specially for target national)
            for (rowColumnCount = 0; rowColumnCount < resultArr[0].length; rowColumnCount++) {
                  newTr = $('<tr>');
                  //add default column
                  newTr.append($('<td>', {
                        'text': reponses[rowColumnCount],
                  }));
                  newTr.append($('<td>', {
                        'text': resultArr[0][rowColumnCount],
                  }));
                  //add each row in body
                  $tbody.append(newTr);
            }
            //add each row in body
            $tbody.append(newTr);
      }
      //Display average if existe
      let checkAvgValue = '';
      for (i = 0; i < allAverage.length; i++) {
            checkAvgValue = allAverage[i].length !== 0 ? true : false;
      }
      if (checkAvgValue) {
            newTrAvg = $('<tr>');
            newTrAvg.append($('<td>', {
                  'text': "Average",
            }));
            for (index = 0; index < allAverage.length; index++) {
                  newTrAvg.append($('<td>', {
                        'text': allAverage[index],
                  }));
            }
            //add avrage in the body
            $tbody.append(newTrAvg);
      }
      // Add table to DOM
      $table.append($thead);
      $table.append($tbody);
      //add table in section
      document.querySelector('section').appendChild(tableDiv);
      $table.appendTo(".table-responsive");

}

//function for display Line graph
function displayLine(values) {
      //declaration and initialization array
      let allArrayData = [];
      let allAverage = [];
      let allAnee = [];
      let tousLesTargets = [];
      let chartIndex = 0;
      //delete all graph id if existe for question
      if ($('*[id^="chart"]').val() != null) {
            $('*[id^="chart"]').remove();
      }
      //delete all class(graph) if existe
      if ($('*[class^="graph"]').val() != null) {
            $('*[class^="graph"]').remove();
      }
      //delete table graph if existe
      if ($('table').length != null) { $('table').remove(); }

      values.forEach(function (value, index) {
            anees = value['code_periode'].split("|");
            //year convert into recent year
            anees = anees.map(function (x) { return parseInt(anees) + updateYear })
            allAnee.push(anees);
            //select all target for line graph by target
            target = value['lib_cible_app'];
            tousLesTargets.push(target);
            reponses = value['reponses'].split("|");
            reponses[reponses.length - 1] == "Average" ? reponses.pop() : reponses;
            datas = value['resul'].split("|");

            questionApp = value['lib_questions_app'].split("|");
            paragraph.innerHTML = questionApp;
            //avg filter
            average = datas.filter(function (x) { return x > 1; })
            allAverage.push(average);
            //data filter
            data = datas.filter(function (x) { return x < 1; })
            //console.log('datas' + [data]);
            //data convert in percentage
            data = data.map(function (x) { return x < 1 ? Math.round(x * 100) : x * 1 })
            allArrayData.push(data);

      })

      div = document.createElement("div");
      div.classList.add('graph');
      canvas = document.createElement('canvas');
      chartId = 'chart' + chartIndex;
      canvas.id = chartId;
      div.appendChild(canvas);

      content = document.querySelector("section");
      content.appendChild(div);
      context = document.getElementById(chartId);
      chartIndex++;
      //convert data in Line Graph
      let resultArr = [];
      if (allArrayData.length > 1) {
            for (let i = 0; i <= allArrayData.length; i++) {
                  let res = [];
                  allArrayData.forEach((arr) => {
                        res.push(arr[i]);
                  });
                  resultArr.push(res);
            }
      } else {
            for (let i = 0; i < allArrayData[0].length; i++) {
                  let res = [];
                  res.push(allArrayData[0][i])
                  resultArr.push(res);
            }
      }


      canvas.parentNode.style.height = "350px";
      //chart initialisation
      const displayLineChart = new Chart(context, {
            type: 'line',
            data: {
                  labels: allAnee,
                  datasets: [
                  ],

            },
            options: {
                  responsive: true,
                  maintainAspectRatio: true,
                  scales: {
                        x: { offset: true }
                  },
                  elements: {
                        line: {
                              tension: .4
                        }
                  },

                  plugins: {
                        datalabels: {
                              align: 'top',
                              color: '#0000FF',
                              labels: {
                                    title: {
                                          font: {
                                                weight: "bold",
                                                size: 9,

                                          }
                                    }
                              },
                              formatter: (value, context) => {
                                    if (context.dataset.label === 'Average' && context.dataset.type == 'bar') { return "Avg " + value; }
                                    else return ''
                              },
                        },
                  }
            },
            plugins: [ChartDataLabels]

      });
      //update chart when active class in by target
      if ($("#bytarget").hasClass("active")) {
            displayLineChart.data.labels = tousLesTargets;
            displayLineChart.update();
      }

      displayColorPalet(reponses)
      generateColorInput()

      $('.colorSelect').on('change', function () {
            pushColorOnChange(displayLineChart)
            displayLineChart.update()
      })


      //data display in line chart
      for (i = 0; i < resultArr.length; i++) {
            //verify in array have any value undefined or not
            checkValueInArray = resultArr[i].every(item => item != undefined)
            if (checkValueInArray) {
                  displayLineChart.data.datasets.push({
                        label: reponses[i],
                        data: resultArr[i],
                        borderWidth: 2,
                        pointRadius: 5,
                  })
            }
      }


      //display average if existe in bar graph in same line graph
      let checkAvgValue = '';
      for (i = 0; i < allAverage.length; i++) {
            checkAvgValue = allAverage[i].length !== 0 ? true : false;
      }
      if (checkAvgValue) {
            displayLineChart.data.datasets.push({
                  type: 'bar',
                  label: 'Average',
                  data: allAverage,
                  borderWidth: 2,
            })
      }
      displayLineChart.update();
}

//function display Bar graph
function displayBar(values) {
      //console.log(values)
      //delete all graph id if existe for quetions
      if ($('*[id^="chart"]').val() != null) {
            $('*[id^="chart"]').remove();
      }
      //delete all class(graph) if existe
      if ($('*[class^="graph"]').val() != null) {
            $('*[class^="graph"]').remove();
      }
      //delete table graph if existe
      if ($('table').length != null) { $('table').remove(); }
      //tousLesTargets = []

      //get response length to display an input for each one
      reponses = values[0].reponses.split('|')
      reponses[reponses.length - 1] == "Average" ? reponses.pop() : reponses;
      displayColorPalet(reponses)

      values.forEach(function (value, index) {
            //collection data from json data
            anees = value['code_periode'].split("|");
            //year convert into recent year
            anees = anees.map(function (x) { return parseInt(anees) + updateYear })
            reponses = value['reponses'].split("|");
            reponses[reponses.length - 1] == "Average" ? reponses.pop() : reponses;
            datas = value['resul'].split("|");
            questionApp = value['lib_questions_app'].split("|");
            //findout target
            target = value['lib_cible_app'];
            paragraph.innerHTML = questionApp;
            //avg filter
            average = datas.filter(function (x) { return x > 1; })
            //data filter
            data = datas.filter(function (x) { return x < 1; })
            //label
            //data convert in percentage
            data = data.map(function (x) { return x < 1 ? Math.round(x * 100) : x * 1 })

            div = document.createElement("div");
            div.classList.add('graph');
            canvas = document.createElement('canvas');
            chartId = 'chart' + index;
            canvas.id = chartId;
            div.appendChild(canvas);
            //average
            textAverage = document.createElement("p");
            textAverage.classList.add('average');

            if (average > 1) {
                  textAverage.innerHTML = "Average " + average;
            } else {
                  textAverage.innerHTML = "";
            }
            div.append(textAverage);

            content = document.querySelector("section");
            content.appendChild(div);
            context = document.getElementById(chartId);

            const chartOptions = {
                  type: 'bar',
                  data: {
                        labels: anees,
                        datasets: [

                        ]
                  },
                  options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                              x: {
                                    stacked: true,
                              },
                              y: {
                                    stacked: true
                              }
                        },
                        plugins: {
                              legend: {
                                    position: 'top',
                              },
                              title: {
                                    display: true,
                                    text: target
                              }
                        }

                  }
            }
            data.forEach((element, index) => {
                  chartOptions.data.datasets.push({
                        data: [element],
                        label: [reponses[index]],
                        //backgroundColor: 'red'

                  })
            })

            generateColorInput()

            //chart initilisation
            const displayBarChart = new Chart(context, chartOptions);

            $('.colorSelect').on('change', function () {
                  pushColorOnChange(displayBarChart)
                  displayBarChart.update()
            })
      })
      //console.log("target " + tousLesTargets)
}
//display pie chart
function displayPie(values) {
      // console.log(values);
      //delete all graph id if existe for quetions
      if ($('*[id^="chart"]').val() != null) {
            $('*[id^="chart"]').remove();
      }
      //delete all class(graph) if existe
      if ($('*[class^="graph"]').val() != null) {
            $('*[class^="graph"]').remove();
      }
      //delete table graph if existe
      if ($('table').length != null) { $('table').remove(); }

      reponses = values[0].reponses.split('|')
      reponses[reponses.length - 1] == "Average" ? reponses.pop() : reponses;
      displayColorPalet(reponses)

      values.forEach(function (value, index) {
            // console.log(values)
            //collection data from json data
            anees = value['code_periode'].split("|");
            //year convert into recent year
            anees = anees.map(function (x) { return parseInt(anees) + updateYear })
            reponses = value['reponses'].split("|");
            //findout target
            target = value['lib_cible_app'];

            reponses[reponses.length - 1] == "Average" ? reponses.pop() : reponses;
            datas = value['resul'].split("|");
            questionApp = value['lib_questions_app'].split("|");

            paragraph.innerHTML = questionApp;
            //avg filter
            average = datas.filter(function (x) { return x > 1; })
            //data filter
            data = datas.filter(function (x) { return x < 1; })
            //label
            //data convert in percentage
            data = data.map(function (x) { return x < 1 ? Math.round(x * 100) : x * 1 })

            div = document.createElement("div");
            div.classList.add('graph');
            canvas = document.createElement('canvas');
            chartId = 'chart' + index;
            canvas.id = chartId;
            div.appendChild(canvas);
            //average
            textAverage = document.createElement("p");
            textAverage.classList.add('averagePie');

            if (average > 1) {
                  textAverage.innerHTML = "Average " + average;
            } else {
                  textAverage.innerHTML = "";
            }
            div.append(textAverage);

            content = document.querySelector("section");
            content.appendChild(div);
            context = document.getElementById(chartId);

            var labelReponses = []
            reponses.forEach(function (item) {
                  labelReponses.push(item);
            })

            const chartOptionsPie = {
                  type: 'doughnut',
                  data: {
                        labels: labelReponses,
                        datasets: [{
                              label: anees,
                              data: data,
                              hoverOffset: 4,
                        }]
                  },
                  options: {
                        responsive: false,
                        plugins: {
                              legend: {
                                    display: true
                              },
                              title: {
                                    display: true,
                                    text: target ? anees + " " + target : anees
                              },
                              datalabels: {
                                    align: 'center',
                                    color: '#fff',
                                    legend: {
                                          position: 'top',
                                    },
                              },
                        }
                  },
                  plugins: [ChartDataLabels],

            }
            //update chart when active class in by target
            //css property
            canvas.parentNode.style.height = '400px';
            //canvas.parentNode.style.width = '400px';
            canvas.parentNode.style.display = 'inline-block';
            //  .average.style.float = '100px';
            //chart initilisation
            generateColorInput()

            const displayPieChart = new Chart(context, chartOptionsPie);

            displayPieChart.update();

            $('.colorSelect').on('change', function () {
                  colors = []
                  $('.colorSelect').each((index, select) => {
                        // let rgbaCol = 'rgba(' + parseInt(select.value.slice(-6, -4), 16) + ',' + parseInt(select.value.slice(-4, -2), 16) + ',' + parseInt(select.value.slice(-2), 16) + ',' + 0.7 + ')';
                        colors.push(select.value)
                  })
                  displayPieChart.data.datasets.forEach((dataset, index) => {
                        dataset.backgroundColor = colors
                  })
                  displayPieChart.update();
            })
      })
}
//display color palate
function displayColorPalet(reponses) {
      $('.colorsDropdown').show();
      $('.colorSelector').remove();
      let allColors = ['#36a2eb', '#ff6384', '#ff9f40', '#ffcd56', '#4bc0c0', '#9966ff', '#c9cbcf']

      for (i = 0; i < reponses.length; i++) {
            let parentDiv = document.getElementById('colorList')
            let div = document.createElement('div')
            div.classList.add('col-3', 'colorSelector', 'd-inline')
            div.style.display = 'none'
            parentDiv.appendChild(div)
            let colorLabel = document.createElement('label');
            colorLabel.classList.add('form-label', 'colorLabel');
            colorLabel.setAttribute('for', 'colorInput' + (i + 1));
            let colorInput = document.createElement('input');
            colorInput.type = 'color';
            colorInput.classList.add('colorSelect', 'form-control', 'form-control-color');
            colorInput.setAttribute('id', 'colorInput' + (i + 1))
            colorInput.value = allColors[i];
            div.append(colorLabel, colorInput);
      }
}
//generate color input
function generateColorInput() {
      //get all colors selectors
      colorSelectors = document.querySelectorAll('.colorSelector')
      //display a selector for each response
      $('.colorSelector').each((index, selector) => {
            if (index < reponses.length) {
                  selector.style.display = 'block'
            } else {
                  selector.style.display = 'none'
            }
      })
      //add each response text to a selector
      $('.colorLabel').each((index, val) => {
            val.innerHTML = reponses[index]
      })
}
//color change when click on color palate
function pushColorOnChange(displayTypeChart) {
      colors = []
      $('.colorSelect').each((index, select) => {
            let rgbaCol = 'rgba(' + parseInt(select.value.slice(-6, -4), 16) + ',' + parseInt(select.value.slice(-4, -2), 16) + ',' + parseInt(select.value.slice(-2), 16) + ',' + 0.7 + ')';
            colors.push(rgbaCol)
      })
      displayTypeChart.data.datasets.forEach((dataset, index) => {
            dataset.backgroundColor = colors[index]
            dataset.borderColor = colors[index]
      })
      displayTypeChart.update();
}

//mobile menu
/*functions for hamberger menu*/
function mobile_openNav() {
      document.getElementById("mobile_nav").style.width = "100%";
}
function mobile_closeNav() {
      document.getElementById("mobile_nav").style.width = "0";
}
/*Smooth scroll for IE/EDGE/SAFARI*/
$("a").on('click', function (event) {
      if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html,body').animate({
                  scrollTop: $(hash).offset().top
            }, 800, function () {
                  window.location.hash = hash
            });
      }
})
//STIKY MENU
$(".js--services-section").waypoint(function (direction) {
      if (direction == "down") {
            $(".stiky-nav").addClass("stiky");
            document.getElementById("my_stiky").style.display = "block";
      } else {
            $(".stiky-nav").removeClass("stiky");
            document.getElementById("my_stiky").style.display = "none";
      }
});

