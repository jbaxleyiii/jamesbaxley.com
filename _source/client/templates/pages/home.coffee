

class home extends Apollos.Component
  @register "home"


  vars: -> [
    asteroidCount: 0
    animationsFinished: false
  ]

  asteroids: ->

    self = @

    if self.asteroidCount.get() is 0
      return []

    asteroids = [1..self.asteroidCount.get()].map (v) ->

      left = Math.floor(Math.random() * 101)
      return {
        top: "110%"
        left: "#{left}%"
        name: "asteroid-#{left}"
      }

    return asteroids


  bindProjects: ->

    self = @

    horizontal = self.$("[data-horizontal]")

    itemWidth = horizontal[0].offsetWidth
    itemHeight = horizontal[0].offsetHeight

    childHeight = 0
    items = horizontal.find("[data-horizontal-item]")

    # get the tallest child
    for item in items
      if item.offsetHeight > childHeight
        childHeight = item.offsetHeight

      item.style.width = "#{item.offsetWidth}px"

    numOfItems = items.length

    newWidth = numOfItems * itemWidth * .8
    horizontal[0].style.width = "#{newWidth}px"
    horizontal[0].style.height = "#{childHeight}px"
    horizontal[0].style["white-space"] = "nowrap"
    horizontal[0].style["overflow-x"] = "auto"



  floatCenter: ->
    self = @

    floatingElement = self.$("[data-float-center]")
    floatingElement[0].style.fontSize = "4.444em"

    width = if isNaN(window.innerWidth) then window.clientWidth else window.innerWidth
    height = if isNaN(window.innerHeight) then window.clientHeight else window.innerHeight

    rect = floatingElement[0].getBoundingClientRect()

    height = (height / 2) - (floatingElement[0].offsetHeight/2)

    floatingElement[0].style.position = "absolute"
    floatingElement[0].style.top = "#{height}px"
    floatingElement[0].style.transition = "font 0.6s ease"





  onRendered: ->

    self = @

    self.floatCenter()

    Meteor.setTimeout ->
      self.asteroidCount.set(30)
    , 1000


    self.autorun (computation) ->

      if self.animationsFinished.get()
        Meteor.setTimeout ->
          self.bindProjects()
        , 100

    self.autorun (computation) ->

      count = self.asteroidCount.get()

      # by some time while the DOM is rendered
      Meteor.setTimeout ->
        asteroids = self.$("[data-asteroid]")
        delay = 0
        for asteroid, index in asteroids
          delay = delay + Math.floor(Math.random() * 101)

          finish = self.clean

          # final callback after all anmiations are done
          if index is asteroids.length - 1
            finish = (nodes) ->

              self.clean(nodes, ->
                floatingElement = self.$("[data-float-center]")
                rect = floatingElement[0].getBoundingClientRect()
                newHeight = rect.top - floatingElement[0].offsetHeight


                floatingElement.velocity({
                  top: "0"
                  fontSize: "1em"
                }, {
                  duration: 600
                  complete: ->

                    self.animationsFinished.set(true)
                    computation.stop()
                })

              )


          $(asteroid).velocity({
              translateY: "-1500px",
              opacity: 1
            }, {
              duration: 600,
              delay: delay,
              complete: finish
            }
          )
      , 100



  clean: (nodes, callback) ->

    for element in nodes
      element.parentNode.removeChild(element)

    if typeof callback is "function"
      callback()
