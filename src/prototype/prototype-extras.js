import $          from 'jquery';
import attr       from './methods/attributes/attr';
import attrValues from './methods/attributes/attr-values';
import byAttrName from './methods/attributes/by-attr-name';
import disable    from './methods/activation/disable';
import enable     from './methods/activation/enable';
import events     from './methods/events/events';
import hasEvent   from './methods/events/has-event';
import id         from './methods/attributes/id';
import name       from './methods/attributes/name';
import val        from './methods/val';

$.extend($.fn, {
  attr,
  attrValues,
  byAttrName,
  disable,
  enable,
  events,
  hasEvent,
  id,
  name,
  val
});
