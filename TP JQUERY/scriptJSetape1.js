$(document).ready(initEvent); //success

function initEvent(){ //success
	$("#bt").click(initBtJquery);
}

/*
function initBt(){
	let reqGetLines = new XMLHttpRequest();

  reqGetLines.open("GET", "https://api.tisseo.fr/v1/lines.json?key=a3732a1074e2403ce364ad6e71eb998cb", true);

  reqGetLines.onreadystatechange = function (){

  	if (reqGetLines.readyState == 4 && reqGetLines.status == 200) {
  	 let donnes = JSON.parse(reqGetLines.responseText);
     let monUl = document.createElement("ul");
     document.querySelector('#showliste').replaceChild(monUl,document.querySelector('#showliste').firstChild);
     donnes.lines.line.forEach(function(line){
      let monLi = document.createElement("li");
      monUl.appendChild(monLi);
      monLi.innerText = line.shortName+" - "+line.name;
    	monLi.style.color=line.bgXmlColor;
		 });
  	}
    else if ( !document.getElementById('showliste').firstChild)
	      document.getElementById("showliste").appendChild(document.createTextNode("Loading"));
	}
  reqGetLines.send(null);
}
*/

function initBtJquery(){
	$.ajax({
		type : "GET",
		url : "https://api.tisseo.fr/v1/lines.json?key=a3732a1074e2403ce364ad6e71eb998cb",
		dataType:"json",
	}).done(function(data){
	let donnees = data.lines.line;
			let monUl = document.createElement("ul");
			$("#showliste").empty();
			$("#showliste").append(monUl);
			$(donnees).each(function(){
				let actualLine = this;
				let monLi = document.createElement("li");
				$(monUl).append(monLi);
				$(monLi).text(this.shortName+" - "+this.name);
				$(monLi).css('color',this.bgXmlColor);
				$.ajax({
					type:"GET",
					url: "https://api.tisseo.fr/v1/stop_points.json?key=a3732a1074e2403ce364ad6e71eb998cb&displayCoordXY=1&lineId="+ this.id,
					dataType: "json"
			 }).done(function(data){
				 let tabl = data.physicalStops.physicalStop;
				 let Ul = document.createElement("ul");
				 $("#showstop").empty();
				 $("#showstop").append(Ul);
				 $(tabl).each(function(){
						let Li = document.createElement("li");
						$(Ul).append(Li);
						$(Li).text(this.name + " (" + this.x + " - " + this.y + ")");
				 })
     })
     .fail(function(){
         console.log("La récupération des données a échouée");
     })
            });
	}).fail(function(){
			$("#showliste").empty();
			$("#showliste").appendChild($(document).createTextNode("Fail :()"));
		})

} 

