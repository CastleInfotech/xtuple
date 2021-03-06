select xt.install_js('XM','SalesRep','xtuple', $$
/* Copyright (c) 1999-2013 by OpenMFG LLC, d/b/a xTuple. 
   See www.xtuple.com/CPAL for the full text of the software license. */

(function () {

  if (!XM.SalesRep) { XM.SalesRep = {}; }

  XM.SalesRep.isDispatchable = true;

  /**
    Return whether a tax authority is referenced by another table.
    
    @param {String} Tax Authority Number
  */
  XM.SalesRep.used = function(id) {
    var exceptions = ["public.crmacct"];
    return XM.PrivateModel.used("XM.SalesRep", id, exceptions);
  };

}());
  
$$ );

