import React from 'react';
import connectMachine from '../service';

class Pim extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.savePower();
        this.saveDuration();
        this.changingtopimanalyzerHandler()
    }

    render() {
        return (
            <main id='pim-page'>

            <div>
            <button onClick={ _ => {this.pimvstimeHandler()} }>PIM Vs Time</button><br />
            <button onClick={ _ => {this.dtpHandler()} }>Distance to PIM</button><br />
            <button onClick={ _ => {this.sweptpimHandler()} }>Swept PIM</button><br />
            <button onClick={ _ => {this.setPower()} }>Set Output Power Level (dBm):</button> <input type="number" id="outputPowerLevel" onInput={this.savePower} /><br />
            <button onClick={ _ => {this.setDuration()} }>Set Test Duration (sec):</button> <input type="number" id="testDuration" onInput={this.saveDuration} /><br />
            </div>

	            <br />
                <span className="spacer" />
                {/*<textarea id="textarea"></textarea>*/}
            </main>
        )
    }

    pimvstimeHandler(){
    	connectMachine('SENSe:PIManalyzer:MODe PIM')
    	.then( data => {
    		this.setResponse(data);
    	});
    }

    setPower() {
        connectMachine(':PIManalyzer:OUTPut:POWer ' + localStorage.getItem('power'))
        .then( data => {
            this.setResponse(data);
        });
    }

    setDuration() {
        connectMachine(':PIManalyzer:TEST:DURation ' + localStorage.getItem('duration'))
        .then( data => {
            this.setResponse(data);
        });
    }

    sweptpimHandler(){
    	connectMachine(':PIManalyzer:MODe PIMSwp')
    	.then( data => {
    		this.setResponse(data);
    	});
    }

    changingtopimanalyzerHandler() {
        connectMachine(':INSTrument:NSELect 46', 'Changing to PIM Analyzer...', 1000)
        .then( data => {
            this.setResponse(data);
        });
    }

    dtpHandler(){
    	connectMachine(':PIManalyzer:MODe DTP')
    	.then( data => {
    		this.setResponse(data);
    	});
    }

    setResponse(resp) {
        console.log(resp)
        // document.getElementById('textarea').value = String(resp);
    }

    savePower(evt) {

		if(evt) {
			// if(evt.target.value < 20) evt.target.value = 20;
			// if(evt.target.value > 46) evt.target.value = 46;
			// localStorage.setItem('power', evt.target.value);
            if(evt.target.value >= 20 && evt.target.value <= 46) {
                document.getElementById('outputPowerLevel').style.backgroundColor = "white";
            } else {
                document.getElementById('outputPowerLevel').style.backgroundColor = "#ff5976";
            }

		} else {
			var power = 43;
	    	try {
	        	var local = JSON.parse(localStorage.getItem('power'));
	    		if(local) power = local;
	    	} catch (e) {
	    		console.log(e);
	    	} finally {
	    		document.getElementById('outputPowerLevel').value = power;
	    		localStorage.setItem('power', power);
	    	}
		}
    }

	saveDuration(evt) {
		if(evt) {
	        if(evt.target.value < 1) evt.target.value = 1;
	        if(evt.target.value > 600) evt.target.value = 600;
	        localStorage.setItem('duration', evt.target.value);
		} else {
			var duration = 30;
	    	try {
	        	var local = JSON.parse(localStorage.getItem('duration'));
	    		if(local) duration = local;
	    	} catch (e) {
	    		console.log(e);
	    	} finally {
	    		document.getElementById('testDuration').value = duration;
	    		localStorage.setItem('duration', duration);
	    	}
		}
	}
    
}

export default Pim;
