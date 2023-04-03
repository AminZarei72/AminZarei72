// export {}
// const asd=require('./Aaaa')
// import React from 'react'
// import ReactDOM from 'react-dom'
// import '/webView1/vis-network.min.js'
// import vis from 'react-graph-vis'
// import  vis from '../../../../node_modules/vis-network'
// import Graph from "react-graph-vis";
// import { Text } from 'react-native-paper';

// ReactDOM.render(<div />,)
//  require('react')
// const ReactDOM=require('react-dom')
// ReactDOM.render(<div />, document.getElementById('root'))

/* ---------- */
//@ts-check
/// <reference types="vis-network" />
// import vis from "vis-network";


try {

  /* ---------- */
  /* ---------- */
  /* ========================================= */
  window.parent.addEventListener('message', function (e2) {
    handleMessagesFromParent(e2);
  });

  function sendMessageToParent(data) {
    window.parent.postMessage(JSON.stringify(
      {
        id: 'child1',
        data: data,
      }
    ), null)
  }
  /* ========================================= */
  /* ---------- */
  function handleMessagesFromParent(event) {
    // console.log(event)
    let parsedMessage = null
    try {
      parsedMessage = event.data ? JSON.parse(event.data) : null
    } catch (error) {
      console.error(
        'err on json parsing,data:',
        event.data,
        ';errorMessage :',
        error
      )
    }
    if (parsedMessage && parsedMessage.id == 'parent') {/* todo:use a valid id like key or something(forse it in input or use key) */
      onParentMessage.call(false, parsedMessage.data ? parsedMessage.data : null)
    }
  }

  /* ---------- */
  /* ---------- */
  /* ---------- */
  /* ---------- */
  /* ---------- */
  function reRender_visNet1(params) {

    // var data = 
    // var options /* : vis.Options */= 
    // const events = {
    //   select: function (event) {
    //     var { nodes, edges } = event;
    //   }
    // };
    // var container = document.getElementById("mynetwork");
    var network = new vis.Network(
      document.getElementById("mynetwork") /* HTMLElement */
      , {/* vis.Data */
        nodes: new vis.DataSet(params.nodes),
        edges: new vis.DataSet(params.edges),
      },
      {
        ...params.options, ...{
          // height:'600',
          // autoResize:true,
        }
      },
      // {}

    )
    // network.moveTo({ scale: 0.4, })
    // console.log(network.body.nodes)
    /* ------------ */
    var nds = network.body.nodes
    var target = nds[Object.keys(nds)[0]]
    document.querySelector('#firstItemForCypressTesting').innerText = target.x + ',' + target.y
    /* ------------ */
    network.on('selectNode', function (item) {
      // console.warn()
      var id = item.nodes[0]
      sendMessageToParent({ event: 'userPressedANode', content: { id: id } })
    })
    // network.canvasToDOM({x:0,y:1})
    // network.enableEditMode()
    network.fit({
      animation: true,
      // nodes:[1,3...]
    })
  }
  /* ---------- */
  /* ---------- */
  /* test */
  var onParentMessage = function (data) {

    if (data.event == 'rerenderWholeNetwork') {
      reRender_visNet1(data.content)
    } else {
      // sendMessageToParent(['this event is not supported',data])
      console.warn('this event is not supported', data)
    }
  }
  /* ---------- */
  /* ---------- */
  /* first load all fns then start communicating */


  sendMessageToParent({
    event: 'imReady',
    content: null,
    /*  content: {
      firstItemForCypressTesting: [
        network.body.nodes[Object.keys(body.nodes)[0]].x,
        network.body.nodes[Object.keys(body.nodes)[0]].y
      ]
    } */
  })
  /* ---------- */
  /* ---------- */
  /* ---------- */
  /* ---------- */
  /* ---------- */
} catch (err) {
  console.error(err)
}
//    true;
