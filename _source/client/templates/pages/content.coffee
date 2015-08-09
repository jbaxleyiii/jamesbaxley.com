

class siteContent extends Apollos.Component

  @register "siteContent"

  insertDOMElement: (parent, node, before) ->

    opts = {}

    if node.classList.contains("display-inline-block")
      opts.display = "inline-block"


    $(node).velocity("transition.fadeIn", opts)
    super
