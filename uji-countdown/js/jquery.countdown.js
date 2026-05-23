/*
 2017 Julian Garnier
 Released under the MIT license
    2.2.0
*/
var $jscomp = { scope: {} };
$jscomp.defineProperty =
	'function' == typeof Object.defineProperties
		? Object.defineProperty
		: function (e, r, p) {
				if (p.get || p.set)
					throw new TypeError(
						'ES3 does not support getters and setters.'
					);
				e != Array.prototype &&
					e != Object.prototype &&
					(e[r] = p.value);
		  };
$jscomp.getGlobal = function (e) {
	return 'undefined' != typeof window && window === e
		? e
		: 'undefined' != typeof global && null != global
		? global
		: e;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = 'jscomp_symbol_';
$jscomp.initSymbol = function () {
	$jscomp.initSymbol = function () {};
	$jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (e) {
	return $jscomp.SYMBOL_PREFIX + (e || '') + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function () {
	$jscomp.initSymbol();
	var e = $jscomp.global.Symbol.iterator;
	e ||
		(e = $jscomp.global.Symbol.iterator =
			$jscomp.global.Symbol('iterator'));
	'function' != typeof Array.prototype[e] &&
		$jscomp.defineProperty(Array.prototype, e, {
			configurable: !0,
			writable: !0,
			value: function () {
				return $jscomp.arrayIterator(this);
			},
		});
	$jscomp.initSymbolIterator = function () {};
};
$jscomp.arrayIterator = function (e) {
	var r = 0;
	return $jscomp.iteratorPrototype(function () {
		return r < e.length ? { done: !1, value: e[r++] } : { done: !0 };
	});
};
$jscomp.iteratorPrototype = function (e) {
	$jscomp.initSymbolIterator();
	e = { next: e };
	e[$jscomp.global.Symbol.iterator] = function () {
		return this;
	};
	return e;
};
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function (e, r) {
	$jscomp.initSymbolIterator();
	e instanceof String && (e += '');
	var p = 0,
		m = {
			next: function () {
				if (p < e.length) {
					var u = p++;
					return { value: r(u, e[u]), done: !1 };
				}
				m.next = function () {
					return { done: !0, value: void 0 };
				};
				return m.next();
			},
		};
	m[Symbol.iterator] = function () {
		return m;
	};
	return m;
};
$jscomp.polyfill = function (e, r, p, m) {
	if (r) {
		p = $jscomp.global;
		e = e.split('.');
		for (m = 0; m < e.length - 1; m++) {
			var u = e[m];
			u in p || (p[u] = {});
			p = p[u];
		}
		e = e[e.length - 1];
		m = p[e];
		r = r(m);
		r != m &&
			null != r &&
			$jscomp.defineProperty(p, e, {
				configurable: !0,
				writable: !0,
				value: r,
			});
	}
};
$jscomp.polyfill(
	'Array.prototype.keys',
	function (e) {
		return e
			? e
			: function () {
					return $jscomp.iteratorFromArray(this, function (e) {
						return e;
					});
			  };
	},
	'es6-impl',
	'es3'
);
var $jscomp$this = this;
(function (e, r) {
	'function' === typeof define && define.amd
		? define([], r)
		: 'object' === typeof module && module.exports
		? (module.exports = r())
		: (e.anime = r());
})(this, function () {
	function e(a) {
		if (!h.col(a))
			try {
				return document.querySelectorAll(a);
			} catch (c) {}
	}
	function r(a, c) {
		for (
			var d = a.length,
				b = 2 <= arguments.length ? arguments[1] : void 0,
				f = [],
				n = 0;
			n < d;
			n++
		)
			if (n in a) {
				var k = a[n];
				c.call(b, k, n, a) && f.push(k);
			}
		return f;
	}
	function p(a) {
		return a.reduce(function (a, d) {
			return a.concat(h.arr(d) ? p(d) : d);
		}, []);
	}
	function m(a) {
		if (h.arr(a)) return a;
		h.str(a) && (a = e(a) || a);
		return a instanceof NodeList || a instanceof HTMLCollection
			? [].slice.call(a)
			: [a];
	}
	function u(a, c) {
		return a.some(function (a) {
			return a === c;
		});
	}
	function C(a) {
		var c = {},
			d;
		for (d in a) c[d] = a[d];
		return c;
	}
	function D(a, c) {
		var d = C(a),
			b;
		for (b in a) d[b] = c.hasOwnProperty(b) ? c[b] : a[b];
		return d;
	}
	function z(a, c) {
		var d = C(a),
			b;
		for (b in c) d[b] = h.und(a[b]) ? c[b] : a[b];
		return d;
	}
	function T(a) {
		a = a.replace(
			/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
			function (a, c, d, k) {
				return c + c + d + d + k + k;
			}
		);
		var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
		a = parseInt(c[1], 16);
		var d = parseInt(c[2], 16),
			c = parseInt(c[3], 16);
		return 'rgba(' + a + ',' + d + ',' + c + ',1)';
	}
	function U(a) {
		function c(a, c, b) {
			0 > b && (b += 1);
			1 < b && --b;
			return b < 1 / 6
				? a + 6 * (c - a) * b
				: 0.5 > b
				? c
				: b < 2 / 3
				? a + (c - a) * (2 / 3 - b) * 6
				: a;
		}
		var d =
			/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a) ||
			/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(a);
		a = parseInt(d[1]) / 360;
		var b = parseInt(d[2]) / 100,
			f = parseInt(d[3]) / 100,
			d = d[4] || 1;
		if (0 == b) f = b = a = f;
		else {
			var n = 0.5 > f ? f * (1 + b) : f + b - f * b,
				k = 2 * f - n,
				f = c(k, n, a + 1 / 3),
				b = c(k, n, a);
			a = c(k, n, a - 1 / 3);
		}
		return (
			'rgba(' + 255 * f + ',' + 255 * b + ',' + 255 * a + ',' + d + ')'
		);
	}
	function y(a) {
		if (
			(a =
				/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
					a
				))
		)
			return a[2];
	}
	function V(a) {
		if (-1 < a.indexOf('translate') || 'perspective' === a) return 'px';
		if (-1 < a.indexOf('rotate') || -1 < a.indexOf('skew')) return 'deg';
	}
	function I(a, c) {
		return h.fnc(a) ? a(c.target, c.id, c.total) : a;
	}
	function E(a, c) {
		if (c in a.style)
			return (
				getComputedStyle(a).getPropertyValue(
					c.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
				) || '0'
			);
	}
	function J(a, c) {
		if (h.dom(a) && u(W, c)) return 'transform';
		if (h.dom(a) && (a.getAttribute(c) || (h.svg(a) && a[c])))
			return 'attribute';
		if (h.dom(a) && 'transform' !== c && E(a, c)) return 'css';
		if (null != a[c]) return 'object';
	}
	function X(a, c) {
		var d = V(c),
			d = -1 < c.indexOf('scale') ? 1 : 0 + d;
		a = a.style.transform;
		if (!a) return d;
		for (
			var b = [], f = [], n = [], k = /(\w+)\((.+?)\)/g;
			(b = k.exec(a));

		)
			f.push(b[1]), n.push(b[2]);
		a = r(n, function (a, b) {
			return f[b] === c;
		});
		return a.length ? a[0] : d;
	}
	function K(a, c) {
		switch (J(a, c)) {
			case 'transform':
				return X(a, c);
			case 'css':
				return E(a, c);
			case 'attribute':
				return a.getAttribute(c);
		}
		return a[c] || 0;
	}
	function L(a, c) {
		var d = /^(\*=|\+=|-=)/.exec(a);
		if (!d) return a;
		var b = y(a) || 0;
		c = parseFloat(c);
		a = parseFloat(a.replace(d[0], ''));
		switch (d[0][0]) {
			case '+':
				return c + a + b;
			case '-':
				return c - a + b;
			case '*':
				return c * a + b;
		}
	}
	function F(a, c) {
		return Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
	}
	function M(a) {
		a = a.points;
		for (var c = 0, d, b = 0; b < a.numberOfItems; b++) {
			var f = a.getItem(b);
			0 < b && (c += F(d, f));
			d = f;
		}
		return c;
	}
	function N(a) {
		if (a.getTotalLength) return a.getTotalLength();
		switch (a.tagName.toLowerCase()) {
			case 'circle':
				return 2 * Math.PI * a.getAttribute('r');
			case 'rect':
				return (
					2 * a.getAttribute('width') + 2 * a.getAttribute('height')
				);
			case 'line':
				return F(
					{ x: a.getAttribute('x1'), y: a.getAttribute('y1') },
					{ x: a.getAttribute('x2'), y: a.getAttribute('y2') }
				);
			case 'polyline':
				return M(a);
			case 'polygon':
				var c = a.points;
				return M(a) + F(c.getItem(c.numberOfItems - 1), c.getItem(0));
		}
	}
	function Y(a, c) {
		function d(b) {
			b = void 0 === b ? 0 : b;
			return a.el.getPointAtLength(1 <= c + b ? c + b : 0);
		}
		var b = d(),
			f = d(-1),
			n = d(1);
		switch (a.property) {
			case 'x':
				return b.x;
			case 'y':
				return b.y;
			case 'angle':
				return (180 * Math.atan2(n.y - f.y, n.x - f.x)) / Math.PI;
		}
	}
	function O(a, c) {
		var d = /-?\d*\.?\d+/g,
			b;
		b = h.pth(a) ? a.totalLength : a;
		if (h.col(b))
			if (h.rgb(b)) {
				var f = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(b);
				b = f ? 'rgba(' + f[1] + ',1)' : b;
			} else b = h.hex(b) ? T(b) : h.hsl(b) ? U(b) : void 0;
		else
			(f = (f = y(b)) ? b.substr(0, b.length - f.length) : b),
				(b = c && !/\s/g.test(b) ? f + c : f);
		b += '';
		return {
			original: b,
			numbers: b.match(d) ? b.match(d).map(Number) : [0],
			strings: h.str(a) || c ? b.split(d) : [],
		};
	}
	function P(a) {
		a = a ? p(h.arr(a) ? a.map(m) : m(a)) : [];
		return r(a, function (a, d, b) {
			return b.indexOf(a) === d;
		});
	}
	function Z(a) {
		var c = P(a);
		return c.map(function (a, b) {
			return { target: a, id: b, total: c.length };
		});
	}
	function aa(a, c) {
		var d = C(c);
		if (h.arr(a)) {
			var b = a.length;
			2 !== b || h.obj(a[0])
				? h.fnc(c.duration) || (d.duration = c.duration / b)
				: (a = { value: a });
		}
		return m(a)
			.map(function (a, b) {
				b = b ? 0 : c.delay;
				a = h.obj(a) && !h.pth(a) ? a : { value: a };
				h.und(a.delay) && (a.delay = b);
				return a;
			})
			.map(function (a) {
				return z(a, d);
			});
	}
	function ba(a, c) {
		var d = {},
			b;
		for (b in a) {
			var f = I(a[b], c);
			h.arr(f) &&
				((f = f.map(function (a) {
					return I(a, c);
				})),
				1 === f.length && (f = f[0]));
			d[b] = f;
		}
		d.duration = parseFloat(d.duration);
		d.delay = parseFloat(d.delay);
		return d;
	}
	function ca(a) {
		return h.arr(a) ? A.apply(this, a) : Q[a];
	}
	function da(a, c) {
		var d;
		return a.tweens.map(function (b) {
			b = ba(b, c);
			var f = b.value,
				e = K(c.target, a.name),
				k = d ? d.to.original : e,
				k = h.arr(f) ? f[0] : k,
				w = L(h.arr(f) ? f[1] : f, k),
				e = y(w) || y(k) || y(e);
			b.from = O(k, e);
			b.to = O(w, e);
			b.start = d ? d.end : a.offset;
			b.end = b.start + b.delay + b.duration;
			b.easing = ca(b.easing);
			b.elasticity =
				(1e3 - Math.min(Math.max(b.elasticity, 1), 999)) / 1e3;
			b.isPath = h.pth(f);
			b.isColor = h.col(b.from.original);
			b.isColor && (b.round = 1);
			return (d = b);
		});
	}
	function ea(a, c) {
		return r(
			p(
				a.map(function (a) {
					return c.map(function (b) {
						var c = J(a.target, b.name);
						if (c) {
							var d = da(b, a);
							b = {
								type: c,
								property: b.name,
								animatable: a,
								tweens: d,
								duration: d[d.length - 1].end,
								delay: d[0].delay,
							};
						} else b = void 0;
						return b;
					});
				})
			),
			function (a) {
				return !h.und(a);
			}
		);
	}
	function R(a, c, d, b) {
		var f = 'delay' === a;
		return c.length
			? (f ? Math.min : Math.max).apply(
					Math,
					c.map(function (b) {
						return b[a];
					})
			  )
			: f
			? b.delay
			: d.offset + b.delay + b.duration;
	}
	function fa(a) {
		var c = D(ga, a),
			d = D(S, a),
			b = Z(a.targets),
			f = [],
			e = z(c, d),
			k;
		for (k in a)
			e.hasOwnProperty(k) ||
				'targets' === k ||
				f.push({ name: k, offset: e.offset, tweens: aa(a[k], d) });
		a = ea(b, f);
		return z(c, {
			children: [],
			animatables: b,
			animations: a,
			duration: R('duration', a, c, d),
			delay: R('delay', a, c, d),
		});
	}
	function q(a) {
		function c() {
			return (
				window.Promise &&
				new Promise(function (a) {
					return (p = a);
				})
			);
		}
		function d(a) {
			return g.reversed ? g.duration - a : a;
		}
		function b(a) {
			for (var b = 0, c = {}, d = g.animations, f = d.length; b < f; ) {
				var e = d[b],
					k = e.animatable,
					h = e.tweens,
					n = h.length - 1,
					l = h[n];
				n &&
					(l =
						r(h, function (b) {
							return a < b.end;
						})[0] || l);
				for (
					var h =
							Math.min(
								Math.max(a - l.start - l.delay, 0),
								l.duration
							) / l.duration,
						w = isNaN(h) ? 1 : l.easing(h, l.elasticity),
						h = l.to.strings,
						p = l.round,
						n = [],
						m = void 0,
						m = l.to.numbers.length,
						t = 0;
					t < m;
					t++
				) {
					var x = void 0,
						x = l.to.numbers[t],
						q = l.from.numbers[t],
						x = l.isPath ? Y(l.value, w * x) : q + w * (x - q);
					p && ((l.isColor && 2 < t) || (x = Math.round(x * p) / p));
					n.push(x);
				}
				if ((l = h.length))
					for (m = h[0], w = 0; w < l; w++)
						(p = h[w + 1]),
							(t = n[w]),
							isNaN(t) || (m = p ? m + (t + p) : m + (t + ' '));
				else m = n[0];
				ha[e.type](k.target, e.property, m, c, k.id);
				e.currentValue = m;
				b++;
			}
			if ((b = Object.keys(c).length))
				for (d = 0; d < b; d++)
					H ||
						(H = E(document.body, 'transform')
							? 'transform'
							: '-webkit-transform'),
						(g.animatables[d].target.style[H] = c[d].join(' '));
			g.currentTime = a;
			g.progress = (a / g.duration) * 100;
		}
		function f(a) {
			if (g[a]) g[a](g);
		}
		function e() {
			g.remaining && !0 !== g.remaining && g.remaining--;
		}
		function k(a) {
			var k = g.duration,
				n = g.offset,
				w = n + g.delay,
				r = g.currentTime,
				x = g.reversed,
				q = d(a);
			if (g.children.length) {
				var u = g.children,
					v = u.length;
				if (q >= g.currentTime)
					for (var G = 0; G < v; G++) u[G].seek(q);
				else for (; v--; ) u[v].seek(q);
			}
			if (q >= w || !k) g.began || ((g.began = !0), f('begin')), f('run');
			if (q > n && q < k) b(q);
			else if (
				(q <= n && 0 !== r && (b(0), x && e()),
				(q >= k && r !== k) || !k)
			)
				b(k), x || e();
			f('update');
			a >= k &&
				(g.remaining
					? ((t = h),
					  'alternate' === g.direction && (g.reversed = !g.reversed))
					: (g.pause(),
					  g.completed ||
							((g.completed = !0),
							f('complete'),
							'Promise' in window && (p(), (m = c())))),
				(l = 0));
		}
		a = void 0 === a ? {} : a;
		var h,
			t,
			l = 0,
			p = null,
			m = c(),
			g = fa(a);
		g.reset = function () {
			var a = g.direction,
				c = g.loop;
			g.currentTime = 0;
			g.progress = 0;
			g.paused = !0;
			g.began = !1;
			g.completed = !1;
			g.reversed = 'reverse' === a;
			g.remaining = 'alternate' === a && 1 === c ? 2 : c;
			b(0);
			for (a = g.children.length; a--; ) g.children[a].reset();
		};
		g.tick = function (a) {
			h = a;
			t || (t = h);
			k((l + h - t) * q.speed);
		};
		g.seek = function (a) {
			k(d(a));
		};
		g.pause = function () {
			var a = v.indexOf(g);
			-1 < a && v.splice(a, 1);
			g.paused = !0;
		};
		g.play = function () {
			g.paused &&
				((g.paused = !1),
				(t = 0),
				(l = d(g.currentTime)),
				v.push(g),
				B || ia());
		};
		g.reverse = function () {
			g.reversed = !g.reversed;
			t = 0;
			l = d(g.currentTime);
		};
		g.restart = function () {
			g.pause();
			g.reset();
			g.play();
		};
		g.finished = m;
		g.reset();
		g.autoplay && g.play();
		return g;
	}
	var ga = {
			update: void 0,
			begin: void 0,
			run: void 0,
			complete: void 0,
			loop: 1,
			direction: 'normal',
			autoplay: !0,
			offset: 0,
		},
		S = {
			duration: 1e3,
			delay: 0,
			easing: 'easeOutElastic',
			elasticity: 500,
			round: 0,
		},
		W =
			'translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective'.split(
				' '
			),
		H,
		h = {
			arr: function (a) {
				return Array.isArray(a);
			},
			obj: function (a) {
				return -1 < Object.prototype.toString.call(a).indexOf('Object');
			},
			pth: function (a) {
				return h.obj(a) && a.hasOwnProperty('totalLength');
			},
			svg: function (a) {
				return a instanceof SVGElement;
			},
			dom: function (a) {
				return a.nodeType || h.svg(a);
			},
			str: function (a) {
				return 'string' === typeof a;
			},
			fnc: function (a) {
				return 'function' === typeof a;
			},
			und: function (a) {
				return 'undefined' === typeof a;
			},
			hex: function (a) {
				return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
			},
			rgb: function (a) {
				return /^rgb/.test(a);
			},
			hsl: function (a) {
				return /^hsl/.test(a);
			},
			col: function (a) {
				return h.hex(a) || h.rgb(a) || h.hsl(a);
			},
		},
		A = (function () {
			function a(a, d, b) {
				return (
					(((1 - 3 * b + 3 * d) * a + (3 * b - 6 * d)) * a + 3 * d) *
					a
				);
			}
			return function (c, d, b, f) {
				if (0 <= c && 1 >= c && 0 <= b && 1 >= b) {
					var e = new Float32Array(11);
					if (c !== d || b !== f)
						for (var k = 0; 11 > k; ++k) e[k] = a(0.1 * k, c, b);
					return function (k) {
						if (c === d && b === f) return k;
						if (0 === k) return 0;
						if (1 === k) return 1;
						for (var h = 0, l = 1; 10 !== l && e[l] <= k; ++l)
							h += 0.1;
						--l;
						var l = h + ((k - e[l]) / (e[l + 1] - e[l])) * 0.1,
							n =
								3 * (1 - 3 * b + 3 * c) * l * l +
								2 * (3 * b - 6 * c) * l +
								3 * c;
						if (0.001 <= n) {
							for (h = 0; 4 > h; ++h) {
								n =
									3 * (1 - 3 * b + 3 * c) * l * l +
									2 * (3 * b - 6 * c) * l +
									3 * c;
								if (0 === n) break;
								var m = a(l, c, b) - k,
									l = l - m / n;
							}
							k = l;
						} else if (0 === n) k = l;
						else {
							var l = h,
								h = h + 0.1,
								g = 0;
							do
								(m = l + (h - l) / 2),
									(n = a(m, c, b) - k),
									0 < n ? (h = m) : (l = m);
							while (1e-7 < Math.abs(n) && 10 > ++g);
							k = m;
						}
						return a(k, d, f);
					};
				}
			};
		})(),
		Q = (function () {
			function a(a, b) {
				return 0 === a || 1 === a
					? a
					: -Math.pow(2, 10 * (a - 1)) *
							Math.sin(
								(2 *
									(a -
										1 -
										(b / (2 * Math.PI)) * Math.asin(1)) *
									Math.PI) /
									b
							);
			}
			var c = 'Quad Cubic Quart Quint Sine Expo Circ Back Elastic'.split(
					' '
				),
				d = {
					In: [
						[0.55, 0.085, 0.68, 0.53],
						[0.55, 0.055, 0.675, 0.19],
						[0.895, 0.03, 0.685, 0.22],
						[0.755, 0.05, 0.855, 0.06],
						[0.47, 0, 0.745, 0.715],
						[0.95, 0.05, 0.795, 0.035],
						[0.6, 0.04, 0.98, 0.335],
						[0.6, -0.28, 0.735, 0.045],
						a,
					],
					Out: [
						[0.25, 0.46, 0.45, 0.94],
						[0.215, 0.61, 0.355, 1],
						[0.165, 0.84, 0.44, 1],
						[0.23, 1, 0.32, 1],
						[0.39, 0.575, 0.565, 1],
						[0.19, 1, 0.22, 1],
						[0.075, 0.82, 0.165, 1],
						[0.175, 0.885, 0.32, 1.275],
						function (b, c) {
							return 1 - a(1 - b, c);
						},
					],
					InOut: [
						[0.455, 0.03, 0.515, 0.955],
						[0.645, 0.045, 0.355, 1],
						[0.77, 0, 0.175, 1],
						[0.86, 0, 0.07, 1],
						[0.445, 0.05, 0.55, 0.95],
						[1, 0, 0, 1],
						[0.785, 0.135, 0.15, 0.86],
						[0.68, -0.55, 0.265, 1.55],
						function (b, c) {
							return 0.5 > b
								? a(2 * b, c) / 2
								: 1 - a(-2 * b + 2, c) / 2;
						},
					],
				},
				b = { linear: A(0.25, 0.25, 0.75, 0.75) },
				f = {},
				e;
			for (e in d)
				(f.type = e),
					d[f.type].forEach(
						(function (a) {
							return function (d, f) {
								b['ease' + a.type + c[f]] = h.fnc(d)
									? d
									: A.apply($jscomp$this, d);
							};
						})(f)
					),
					(f = { type: f.type });
			return b;
		})(),
		ha = {
			css: function (a, c, d) {
				return (a.style[c] = d);
			},
			attribute: function (a, c, d) {
				return a.setAttribute(c, d);
			},
			object: function (a, c, d) {
				return (a[c] = d);
			},
			transform: function (a, c, d, b, f) {
				b[f] || (b[f] = []);
				b[f].push(c + '(' + d + ')');
			},
		},
		v = [],
		B = 0,
		ia = (function () {
			function a() {
				B = requestAnimationFrame(c);
			}
			function c(c) {
				var b = v.length;
				if (b) {
					for (var d = 0; d < b; ) v[d] && v[d].tick(c), d++;
					a();
				} else cancelAnimationFrame(B), (B = 0);
			}
			return a;
		})();
	q.version = '2.2.0';
	q.speed = 1;
	q.running = v;
	q.remove = function (a) {
		a = P(a);
		for (var c = v.length; c--; )
			for (var d = v[c], b = d.animations, f = b.length; f--; )
				u(a, b[f].animatable.target) &&
					(b.splice(f, 1), b.length || d.pause());
	};
	q.getValue = K;
	q.path = function (a, c) {
		var d = h.str(a) ? e(a)[0] : a,
			b = c || 100;
		return function (a) {
			return { el: d, property: a, totalLength: N(d) * (b / 100) };
		};
	};
	q.setDashoffset = function (a) {
		var c = N(a);
		a.setAttribute('stroke-dasharray', c);
		return c;
	};
	q.bezier = A;
	q.easings = Q;
	q.timeline = function (a) {
		var c = q(a);
		c.pause();
		c.duration = 0;
		c.add = function (d) {
			c.children.forEach(function (a) {
				a.began = !0;
				a.completed = !0;
			});
			m(d).forEach(function (b) {
				var d = z(b, D(S, a || {}));
				d.targets = d.targets || a.targets;
				b = c.duration;
				var e = d.offset;
				d.autoplay = !1;
				d.direction = c.direction;
				d.offset = h.und(e) ? b : L(e, b);
				c.began = !0;
				c.completed = !0;
				c.seek(d.offset);
				d = q(d);
				d.began = !0;
				d.completed = !0;
				d.duration > b && (c.duration = d.duration);
				c.children.push(d);
			});
			c.seek(0);
			c.reset();
			c.autoplay && c.restart();
			return c;
		};
		return c;
	};
	q.random = function (a, c) {
		return Math.floor(Math.random() * (c - a + 1)) + a;
	};
	return q;
});

/* globals JQClass */
/*! Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function () {
	'use strict';
	var initializing = false;

	// The base JQClass implementation (does nothing)
	window.JQClass = function () {};

	// Collection of derived classes
	JQClass.classes = {};

	// Create a new JQClass that inherits from this class
	JQClass.extend = function extender(prop) {
		var base = this.prototype;

		// Instantiate a base class (but only create the instance, don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// jshint loopfunc:true
			// Check if we're overwriting an existing function
			if (
				typeof prop[name] === 'function' &&
				typeof base[name] === 'function'
			) {
				prototype[name] = (function (name, fn) {
					return function () {
						var __super = this._super;
						// Add a new ._super() method that is the same method but on the super-class
						this._super = function (args) {
							return base[name].apply(this, args || []);
						};
						var ret = fn.apply(this, arguments);
						// The method only needs to be bound temporarily, so we remove it when we're done executing
						this._super = __super;
						return ret;
					};
				})(name, prop[name]);
				// Check if we're overwriting existing default options.
			} else if (
				typeof prop[name] === 'object' &&
				typeof base[name] === 'object' &&
				name === 'defaultOptions'
			) {
				var obj1 = base[name];
				var obj2 = prop[name];
				var obj3 = {};
				var key;
				for (key in obj1) {
					// jshint forin:false
					obj3[key] = obj1[key];
				}
				for (key in obj2) {
					// jshint forin:false
					obj3[key] = obj2[key];
				}
				prototype[name] = obj3;
			} else {
				prototype[name] = prop[name];
			}
		}

		// The dummy class constructor
		function JQClass() {
			// All construction is actually done in the init method
			if (!initializing && this._init) {
				this._init.apply(this, arguments);
			}
		}

		// Populate our constructed prototype object
		JQClass.prototype = prototype;

		// Enforce the constructor to be what we expect
		JQClass.prototype.constructor = JQClass;

		// And make this class extendable
		JQClass.extend = extender;

		return JQClass;
	};
})();
/*! Abstract base class for collection plugins v1.0.2.
	Written by Keith Wood (wood.keith{at}optusnet.com.au) December 2013.
	Licensed under the MIT license (http://keith-wood.name/licence.html). */
(function ($) {
	// Ensure $, encapsulate
	'use strict';

	/** <p>Abstract base class for collection plugins v1.0.2.</p>
		<p>Written by Keith Wood (wood.keith{at}optusnet.com.au) December 2013.</p>
		<p>Licensed under the MIT license (http://keith-wood.name/licence.html).</p>
		<p>Use {@link $.JQPlugin.createPlugin} to create new plugins using this framework.</p>
		<p>This base class provides common functionality such as:</p>
		<ul>
			<li>Creates jQuery bridge - allowing you to invoke your plugin on a collection of elements.</li>
			<li>Handles initialisation including reading settings from metadata -
				an instance object is attached to the affected element(s) containing all the necessary data.</li>
			<li>Handles option retrieval and update - options can be set through default values,
				through inline metadata, or through instantiation settings.<br>
				Metadata is specified as an attribute on the element:
				<code>data-&lt;pluginName>="&lt;option name>: '&lt;value>', ..."</code>.
				Dates should be specified as strings in this format: <code>'new Date(y, m-1, d)'</code>.</li>
			<li>Handles method calling - inner functions starting with '_'are inaccessible,
				whereas others can be called via <code>$(selector).pluginName('functionName')</code>.</li>
			<li>Handles plugin destruction - removing all trace of the plugin.</li>
		</ul>
		@module JQPlugin
		@abstract */
	JQClass.classes.JQPlugin = JQClass.extend({
		/** Name to identify this plugin.
			@example name: 'tabs' */
		name: 'plugin',

		/** Default options for instances of this plugin (default: {}).
			@example defaultOptions: {
  selectedClass: 'selected',
  triggers: 'click'
} */
		defaultOptions: {},

		/** Options dependent on the locale.
			Indexed by language and (optional) country code, with '' denoting the default language (English/US).
			Normally additional languages would be provided as separate files to all them to be included as needed.
			@example regionalOptions: {
  '': {
    greeting: 'Hi'
  }
} */
		regionalOptions: {},

		/** Whether or not a deep merge should be performed when accumulating options.
			The default is <code>true</code> but can be overridden in a sub-class. */
		deepMerge: true,

		/** Retrieve a marker class for affected elements.
			In the format: <code>is-&lt;pluginName&gt;</code>.
			@protected
			@return {string} The marker class. */
		_getMarker: function () {
			return 'is-' + this.name;
		},

		/** Initialise the plugin.
			Create the jQuery bridge - plugin name <code>xyz</code>
			produces singleton <code>$.xyz</code> and collection function <code>$.fn.xyz</code>.
			@protected */
		_init: function () {
			// Apply default localisations
			$.extend(
				this.defaultOptions,
				(this.regionalOptions && this.regionalOptions['']) || {}
			);
			// Camel-case the name
			var jqName = camelCase(this.name);
			// Expose jQuery singleton manager
			$[jqName] = this;
			// Expose jQuery collection plugin
			$.fn[jqName] = function (options) {
				var otherArgs = Array.prototype.slice.call(arguments, 1);
				var inst = this;
				var returnValue = this;
				this.each(function () {
					if (typeof options === 'string') {
						if (options[0] === '_' || !$[jqName][options]) {
							throw 'Unknown method: ' + options;
						}
						var methodValue = $[jqName][options].apply(
							$[jqName],
							[this].concat(otherArgs)
						);
						if (methodValue !== inst && methodValue !== undefined) {
							returnValue = methodValue;
							return false;
						}
					} else {
						$[jqName]._attach(this, options);
					}
				});
				return returnValue;
			};
		},

		/** Set default options for all subsequent instances.
			@param {object} options The new default options.
			@example $.pluginName.setDefaults({name: value, ...}) */
		setDefaults: function (options) {
			$.extend(this.defaultOptions, options || {});
		},

		/** Initialise an element. Called internally only.
			Adds an instance object as data named for the plugin.
			Override {@linkcode module:JQPlugin~_postAttach|_postAttach} for plugin-specific processing.
			@private
			@param {Element} elem The element to enhance.
			@param {object} options Overriding settings. */
		_attach: function (elem, options) {
			elem = $(elem);
			if (elem.hasClass(this._getMarker())) {
				return;
			}
			elem.addClass(this._getMarker());
			options = $.extend(
				this.deepMerge,
				{},
				this.defaultOptions,
				this._getMetadata(elem),
				options || {}
			);
			var inst = $.extend(
				{ name: this.name, elem: elem, options: options },
				this._instSettings(elem, options)
			);
			elem.data(this.name, inst); // Save instance against element
			this._postAttach(elem, inst);
			this.option(elem, options);
		},

		/** Retrieve additional instance settings.
			Override this in a sub-class to provide extra settings.
			These are added directly to the instance object.
			Default attributes of an instance object are shown as properties below:
			@protected
			@param {jQuery} elem The current jQuery element.
			@param {object} options The instance options.
			@return {object} Any extra instance values.
			@property {Element} elem The element to which this instance applies.
			@property {string} name The name of this plugin.
			@property {object} options The accumulated options for this instance.
			@example _instSettings: function(elem, options) {
  return {nav: elem.find(options.navSelector)};
} */
		_instSettings: function (elem, options) {
			// jshint unused:false
			return {};
		},

		/** Plugin specific post initialisation.
			Override this in a sub-class to perform extra activities.
			This is where you would implement your plugin's main functionality.
			@protected
			@param {jQuery} elem The current jQuery element.
			@param {object} inst The instance settings.
			@example _postAttach: function(elem, inst) {
  elem.on('click.' + this.name, function() {
    ...
  });
} */
		_postAttach: function (elem, inst) {
			// jshint unused:false
		},

		/** Retrieve metadata configuration from the element.
			Metadata is specified as an attribute:
			<code>data-&lt;pluginName>="&lt;option name>: '&lt;value>', ..."</code>.
			Dates should be specified as strings in this format: <code>'new Date(y, m-1, d)'</code>.
			@private
			@param {jQuery} elem The source element.
			@return {object} The inline configuration or {}. */
		_getMetadata: function (elem) {
			try {
				var data = elem.data(this.name.toLowerCase()) || '';
				data = data
					.replace(/(\\?)'/g, function (e, t) {
						return t ? "'" : '"';
					})
					.replace(/([a-zA-Z0-9]+):/g, function (match, group, i) {
						var count = data.substring(0, i).match(/"/g); // Handle embedded ':'
						return !count || count.length % 2 === 0
							? '"' + group + '":'
							: group + ':';
					})
					.replace(/\\:/g, ':');
				data = $.parseJSON('{' + data + '}');
				for (var key in data) {
					if (data.hasOwnProperty(key)) {
						var value = data[key];
						if (
							typeof value === 'string' &&
							value.match(/^new Date\(([-0-9,\s]*)\)$/)
						) {
							// Convert dates
							data[key] = eval(value); // jshint ignore:line
						}
					}
				}
				return data;
			} catch (e) {
				return {};
			}
		},

		/** Retrieve the instance data for element.
			@protected
			@param {Element} elem The source element.
			@return {object} The instance data or <code>{}</code> if none. */
		_getInst: function (elem) {
			return $(elem).data(this.name) || {};
		},

		/** Retrieve or reconfigure the settings for a plugin.
			If new settings are provided they are applied to the instance options.
			If an option name only is provided the value of that option is returned.
			If no name or value is provided, all options are returned.
			Override {@linkcode module:JQPlugin~_optionsChanged|_optionsChanged}
			for plugin-specific processing when option values change.
			@param {Element} elem The source element.
			@param {object|string} [name] The collection of new option values or the name of a single option.
			@param {any} [value] The value for a single named option.
			@return {any|object} If retrieving a single value or all options.
			@example $(selector).plugin('option', 'name', value) // Set one option
$(selector).plugin('option', {name: value, ...}) // Set multiple options
var value = $(selector).plugin('option', 'name') // Get one option
var options = $(selector).plugin('option') // Get all options */
		option: function (elem, name, value) {
			elem = $(elem);
			var inst = elem.data(this.name);
			var options = name || {};
			if (
				!name ||
				(typeof name === 'string' && typeof value === 'undefined')
			) {
				options = (inst || {}).options;
				return options && name ? options[name] : options;
			}
			if (!elem.hasClass(this._getMarker())) {
				return;
			}
			if (typeof name === 'string') {
				options = {};
				options[name] = value;
			}
			this._optionsChanged(elem, inst, options);
			$.extend(inst.options, options);
		},

		/** Plugin specific options processing.
			Old value available in <code>inst.options[name]</code>, new value in <code>options[name]</code>.
			Override this in a sub-class to perform extra activities.
			@protected
			@param {jQuery} elem The current jQuery element.
			@param {object} inst The instance settings.
			@param {object} options The new options.
			@example _optionsChanged: function(elem, inst, options) {
  if (options.name != inst.options.name) {
    elem.removeClass(inst.options.name).addClass(options.name);
  }
} */
		_optionsChanged: function (elem, inst, options) {
			// jshint unused:false
		},

		/** Remove all trace of the plugin.
			Override {@linkcode module:JQPlugin~_preDestroy|_preDestroy} for plugin-specific processing.
			@param {Element} elem The source element.
			@example $(selector).plugin('destroy') */
		destroy: function (elem) {
			elem = $(elem);
			if (!elem.hasClass(this._getMarker())) {
				return;
			}
			this._preDestroy(elem, this._getInst(elem));
			elem.removeData(this.name).removeClass(this._getMarker());
		},

		/** Plugin specific pre destruction.
			It is invoked as part of the {@linkcode module:JQPlugin~destroy|destroy} processing.
			Override this in a sub-class to perform extra activities and undo everything that was
			done in the {@linkcode module:JQPlugin~_postAttach|_postAttach} or
			{@linkcode module:JQPlugin~_optionsChanged|_optionsChanged} functions.
			@protected
			@param {jQuery} elem The current jQuery element.
			@param {object} inst The instance settings.
			@example _preDestroy: function(elem, inst) {
  elem.off('.' + this.name);
} */
		_preDestroy: function (elem, inst) {
			// jshint unused:false
		},
	});

	/** Convert names from hyphenated to camel-case.
		@private
		@param {string} value The original hyphenated name.
		@return {string} The camel-case version. */
	function camelCase(name) {
		return name.replace(/-([a-z])/g, function (match, group) {
			return group.toUpperCase();
		});
	}

	/** Expose the plugin base.
		@namespace $.JQPlugin */
	$.JQPlugin = {
		/** Create a new collection plugin.
			@memberof $.JQPlugin
			@param {string} [superClass='JQPlugin'] The name of the parent class to inherit from.
			@param {object} overrides The property/function overrides for the new class.
				See {@link module:JQPlugin|JQPlugin} for the base functionality.
			@example $.JQPlugin.createPlugin({ // Define the plugin
  name: 'tabs',
  defaultOptions: {selectedClass: 'selected'},
  _initSettings: function(elem, options) { return {...}; },
  _postAttach: function(elem, inst) { ... }
});
$('selector').tabs(); // And instantiate it */
		createPlugin: function (superClass, overrides) {
			if (typeof superClass === 'object') {
				overrides = superClass;
				superClass = 'JQPlugin';
			}
			superClass = camelCase(superClass);
			var className = camelCase(overrides.name);
			JQClass.classes[className] =
				JQClass.classes[superClass].extend(overrides);
			new JQClass.classes[className](); // jshint ignore:line
		},
	};
})(jQuery);

/*! http://keith-wood.name/countdown.html
	Countdown for jQuery v2.1.0.
	Written by Keith Wood (wood.keith{at}optusnet.com.au) January 2008.
	Available under the MIT (http://keith-wood.name/licence.html) license. 
	Please attribute the author if you use it. */

(function ($) {
	// Hide scope, no $ conflict
	'use strict';

	var pluginName = 'countdown';

	var Y = 0; // Years
	var O = 1; // Months
	var W = 2; // Weeks
	var D = 3; // Days
	var H = 4; // Hours
	var M = 5; // Minutes
	var S = 6; // Seconds

	/** Create the countdown plugin.
		<p>Sets an element to show the time remaining until a given instant.</p>
		<p>Expects HTML like:</p>
		<pre>&lt;div>&lt;/div></pre>
		<p>Provide inline configuration like:</p>
		<pre>&lt;div data-countdown="name: 'value', ...">&lt;/div></pre>
		@module Countdown
		@augments JQPlugin
		@example $(selector).countdown({until: +300}) */
	$.JQPlugin.createPlugin({
		/** The name of the plugin.
			@default 'countdown' */
		name: pluginName,

		/** Countdown expiry callback.
			Used with the {@linkcode module:Countdown~defaultOptions|onExpiry} option and
			triggered when the countdown expires.
			@global
			@callback CountdownExpiryCallback
			@this <code>Element</code>
			@example onExpiry: function() {
  alert('Done');
} */

		/** Countdown server synchronisation callback.
			Used with the {@linkcode module:Countdown~defaultOptions|serverSync} option and
			triggered when the countdown is initialised.
			@global
			@callback CountdownServerSyncCallback
			@return {Date} The current date/time on the server as expressed in the local timezone.
			@this <code>$.countdown</code>
			@example serverSync: function() {
  var time = null;
  $.ajax({url: 'http://myserver.com/serverTime.php',
    async: false, dataType: 'text',
    success: function(text) {
      time = new Date(text);
    }, error: function(http, message, exc) {
      time = new Date();
  });
  return time;
} */

		/** Countdown tick callback.
			Used with the {@linkcode module:Countdown~defaultOptions|onTick} option and
			triggered on every {@linkcode module:Countdown~defaultOptions|tickInterval} ticks of the countdown.
			@global
			@callback CountdownTickCallback
			@this <code>Element</code>
			@param {number[]} periods The breakdown by period (years, months, weeks, days,
					hours, minutes, seconds) of the time remaining/passed.
			@example onTick: function(periods) {
  $('#altTime').text(periods[4] + ':' + twoDigits(periods[5]) +
    ':' + twoDigits(periods[6]));
} */

		/** Countdown which labels callback.
			Used with the {@linkcode module:Countdown~regionalOptions|whichLabels} option and
			triggered when the countdown is being display to determine which set of labels
			(<code>labels</code>, <code>labels1</code>, ...) are to be used for the current period value.
			@global
			@callback CountdownWhichLabelsCallback
			@param {number} num The current period value.
			@return {number} The suffix for the label set to use, or zero for the default labels.
			@example whichLabels: function(num) {
  return (num === 1 ? 1 : (num >= 2 && num <= 4 ? 2 : 0));
} */

		/** Default settings for the plugin.
			@property {Date|number|string} [until] The date/time to count down to, or number of seconds
						offset from now, or string of amounts and units for offset(s) from now:
						'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
						One of <code>until</code> or <code>since</code> must be specified.
						If both are given <code>since</code> takes precedence.
			@example until: new Date(2013, 12-1, 25, 13, 30)
until: +300
until: '+1O -2D'
			@property {Date|number|string} [since] The date/time to count up from, or number of seconds
						offset from now, or string of amounts and units for offset(s) from now:
						'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
						One of <code>until</code> or <code>since</code> must be specified.
						If both are given <code>since</code> takes precedence.
			@example since: new Date(2013, 1-1, 1)
since: -300
since: '-1O +2D'
			@property {number} [timezone=null] The timezone (hours or minutes from GMT) for the target times,
						or <code>null</code> for client local timezone.
			@example timezone: +10
timezone: -60
			@property {CountdownServerSyncCallback} [serverSync=null] A function to retrieve the current server time
						for synchronisation.
			@property {string} [format='dHMS'] The format for display - upper case to always show,
						lower case to show only if non-zero,
						'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
			@property {string} [layout=''] <p>Build your own layout for the countdown.</p>
						<p>Indicate substitution points with '{desc}' for the description, '{sep}' for the time separator,
						'{pv}' where p is 'y' for years, 'o' for months, 'w' for weeks, 'd' for days,
						'h' for hours, 'm' for minutes, or 's' for seconds and v is 'n' for the period value,
						'nn' for the period value with a minimum of two digits,
						'nnn' for the period value with a minimum of three digits, or
						'l' for the period label (long or short form depending on the compact setting), or
						'{pd}' where p is as above and d is '1' for the units digit, '10' for the tens digit,
						'100' for the hundreds digit, or '1000' for the thousands digit.</p>
						<p>If you need to exclude entire sections when the period value is zero and
						you have specified the period as optional, surround these sections with
						'{p<}' and '{p>}', where p is the same as above.</p>
						<p>Your layout can just be simple text, or can contain HTML markup as well.</p>
			@example layout: '{d<}{dn} {dl}{d>} {hnn}:{mnn}:{snn}'
			@property {boolean} [compact=false] <code>true</code> to display in a compact format,
						<code>false</code> for an expanded one.
			@property {boolean} [padZeroes=false] <code>true</code> to add leading zeroes.
			@property {number} [significant=0] The maximum number of periods with non-zero values to show, zero for all.
			@property {string} [description=''] The description displayed for the countdown.
			@property {string} [expiryUrl=''] A URL to load upon expiry, replacing the current page.
			@property {string} [expiryText=''] Text to display upon expiry, replacing the countdown. This may be HTML.
			@property {boolean} [alwaysExpire=false] <code>true</code> to trigger <code>onExpiry</code>
						even if the target time has passed.
			@property {CountdownExpiryCallback} [onExpiry=null] Callback when the countdown expires -
						receives no parameters and <code>this</code> is the containing element.
			@example onExpiry: function() {
  ...
}
			@property {CountdownTickCallback} [onTick=null] Callback when the countdown is updated -
						receives <code>number[7]</code> being the breakdown by period
						(years, months, weeks, days, hours, minutes, seconds - based on
						<code>format</code>) and <code>this</code> is the containing element.
			@example onTick: function(periods) {
  var secs = $.countdown.periodsToSeconds(periods);
  if (secs < 300) { // Last five minutes
    ...
  }
}
			@property {number} [tickInterval=1] The interval (seconds) between <code>onTick</code> callbacks. */
		defaultOptions: {
			until: null,
			since: null,
			timezone: null,
			serverSync: null,
			format: 'dHMS',
			layout: '',
			compact: false,
			padZeroes: false,
			significant: 0,
			description: '',
			expiryUrl: '',
			expiryText: '',
			alwaysExpire: false,
			onExpiry: null,
			onTick: null,
			tickInterval: 1,
		},

		/** Localisations for the plugin.
			Entries are objects indexed by the language code ('' being the default US/English).
			Each object has the following attributes.
			@property {string[]} [labels=['Years','Months','Weeks','Days','Hours','Minutes','Seconds']]
						The display texts for the counter periods.
			@property {string[]} [labels1=['Year','Month','Week','Day','Hour','Minute','Second']]
						The display texts for the counter periods if they have a value of 1.
						Add other <code>labels<em>n</em></code> attributes as necessary to
						cater for other numeric idiosyncrasies of the localisation.
			@property {string[]}[compactLabels=['y','m','w','d']] The compact texts for the counter periods.
			@property {CountdownWhichLabelsCallback} [whichLabels=null] A function to determine which
						<code>labels<em>n</em></code> to use.
			@example whichLabels: function(num) {
  return (num > 1 ? 0 : 1);
}
			@property {string[]} [digits=['0','1',...,'9']] The digits to display (0-9).
			@property {string} [timeSeparator=':'] Separator for time periods in the compact layout.
			@property {boolean} [isRTL=false] <code>true</code> for right-to-left languages,
						<code>false</code> for left-to-right. */
		regionalOptions: {
			// Available regional settings, indexed by language/country code
			'': {
				// Default regional settings - English/US
				labels: [
					'Years',
					'Months',
					'Weeks',
					'Days',
					'Hours',
					'Minutes',
					'Seconds',
				],
				labels1: [
					'Year',
					'Month',
					'Week',
					'Day',
					'Hour',
					'Minute',
					'Second',
				],
				compactLabels: ['y', 'm', 'w', 'd'],
				whichLabels: null,
				digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
				timeSeparator: ':',
				isRTL: false,
			},
		},

		/* Class name for the right-to-left marker. */
		_rtlClass: pluginName + '-rtl',
		/* Class name for the countdown section marker. */
		_sectionClass: pluginName + '-section',
		/* Class name for the period amount marker. */
		_amountClass: pluginName + '-amount',
		/* Class name for the period name marker. */
		_periodClass: pluginName + '-period',
		/* Class name for the countdown row marker. */
		_rowClass: pluginName + '-row',
		/* Class name for the holding countdown marker. */
		_holdingClass: pluginName + '-holding',
		/* Class name for the showing countdown marker. */
		_showClass: pluginName + '-show',
		/* Class name for the description marker. */
		_descrClass: pluginName + '-descr',

		/* List of currently active countdown elements. */
		_timerElems: [],

		/** Additional setup for the countdown.
			Apply default localisations.
			Create the timer.
			@private */
		_init: function () {
			var self = this;
			this._super();
			this._serverSyncs = [];
			var now =
				typeof Date.now === 'function'
					? Date.now
					: function () {
							return new Date().getTime();
					  };
			var perfAvail =
				window.performance &&
				typeof window.performance.now === 'function';
			// Shared timer for all countdowns
			function timerCallBack(timestamp) {
				var drawStart =
					timestamp < 1e12 // New HTML5 high resolution timer
						? perfAvail
							? window.performance.now() +
							  window.performance.timing.navigationStart
							: now()
						: // Integer milliseconds since unix epoch
						  timestamp || now();
				if (drawStart - animationStartTime >= 1000) {
					self._updateElems();
					animationStartTime = drawStart;
				}
				requestAnimationFrame(timerCallBack);
			}
			var requestAnimationFrame =
				window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				null;
			// This is when we expect a fall-back to setInterval as it's much more fluid
			var animationStartTime = 0;
			if (!requestAnimationFrame || $.noRequestAnimationFrame) {
				$.noRequestAnimationFrame = null;
				// Fall back to good old setInterval
				$.countdown._timer = setInterval(function () {
					self._updateElems();
				}, 1000);
			} else {
				animationStartTime =
					window.animationStartTime ||
					window.webkitAnimationStartTime ||
					window.mozAnimationStartTime ||
					window.oAnimationStartTime ||
					window.msAnimationStartTime ||
					now();
				requestAnimationFrame(timerCallBack);
			}
		},

		/** Convert a date/time to UTC.
			@param {number} tz The hour or minute offset from GMT, e.g. +9, -360.
			@param {Date|number} year the date/time in that timezone or the year in that timezone.
			@param {number} [month] The month (0 - 11) (omit if <code>year</code> is a <code>Date</code>).
			@param {number} [day] The day (omit if <code>year</code> is a <code>Date</code>).
			@param {number} [hours] The hour (omit if <code>year</code> is a <code>Date</code>).
			@param {number} [mins] The minute (omit if <code>year</code> is a <code>Date</code>).
			@param {number} [secs] The second (omit if <code>year</code> is a <code>Date</code>).
			@param {number} [ms] The millisecond (omit if <code>year</code> is a <code>Date</code>).
			@return {Date} The equivalent UTC date/time.
			@example $.countdown.UTCDate(+10, 2013, 12-1, 25, 12, 0)
$.countdown.UTCDate(-7, new Date(2013, 12-1, 25, 12, 0)) */
		UTCDate: function (tz, year, month, day, hours, mins, secs, ms) {
			if (typeof year === 'object' && year instanceof Date) {
				ms = year.getMilliseconds();
				secs = year.getSeconds();
				mins = year.getMinutes();
				hours = year.getHours();
				day = year.getDate();
				month = year.getMonth();
				year = year.getFullYear();
			}
			var d = new Date();
			d.setUTCFullYear(year);
			d.setUTCDate(1);
			d.setUTCMonth(month || 0);
			d.setUTCDate(day || 1);
			d.setUTCHours(hours || 0);
			d.setUTCMinutes((mins || 0) - (Math.abs(tz) < 30 ? tz * 60 : tz));
			d.setUTCSeconds(secs || 0);
			d.setUTCMilliseconds(ms || 0);
			return d;
		},

		/** Convert a set of periods into seconds.
			Averaged for months and years.
			@param {number[]} periods The periods per year/month/week/day/hour/minute/second.
			@return {number} The corresponding number of seconds.
			@example var secs = $.countdown.periodsToSeconds(periods) */
		periodsToSeconds: function (periods) {
			return (
				periods[0] * 31557600 +
				periods[1] * 2629800 +
				periods[2] * 604800 +
				periods[3] * 86400 +
				periods[4] * 3600 +
				periods[5] * 60 +
				periods[6]
			);
		},

		/** Resynchronise the countdowns with the server.
			@example $.countdown.resync() */
		resync: function () {
			var self = this;
			$('.' + this._getMarker()).each(function () {
				// Each countdown
				var inst = $.data(this, self.name);
				if (inst.options.serverSync) {
					// If synced
					var serverSync = null;
					for (var i = 0; i < self._serverSyncs.length; i++) {
						if (
							self._serverSyncs[i][0] === inst.options.serverSync
						) {
							// Find sync details
							serverSync = self._serverSyncs[i];
							break;
						}
					}
					if (self._eqNull(serverSync[2])) {
						// Recalculate if missing
						var serverResult = $.isFunction(inst.options.serverSync)
							? inst.options.serverSync.apply(this, [])
							: null;
						serverSync[2] =
							(serverResult
								? new Date().getTime() - serverResult.getTime()
								: 0) - serverSync[1];
					}
					if (inst._since) {
						// Apply difference
						inst._since.setMilliseconds(
							inst._since.getMilliseconds() + serverSync[2]
						);
					}
					inst._until.setMilliseconds(
						inst._until.getMilliseconds() + serverSync[2]
					);
				}
			});
			for (var i = 0; i < self._serverSyncs.length; i++) {
				// Update sync details
				if (!self._eqNull(self._serverSyncs[i][2])) {
					self._serverSyncs[i][1] += self._serverSyncs[i][2];
					delete self._serverSyncs[i][2];
				}
			}
		},

		_instSettings: function (elem, options) {
			// jshint unused:false
			return { _periods: [0, 0, 0, 0, 0, 0, 0] };
		},

		/** Add an element to the list of active ones.
			@private
			@param {Element} elem The countdown element. */
		_addElem: function (elem) {
			if (!this._hasElem(elem)) {
				this._timerElems.push(elem);
			}
		},

		/** See if an element is in the list of active ones.
			@private
			@param {Element} elem The countdown element.
			@return {boolean} <code>true</code> if present, <code>false</code> if not. */
		_hasElem: function (elem) {
			return $.inArray(elem, this._timerElems) > -1;
		},

		/** Remove an element from the list of active ones.
			@private
			@param {Element} elem The countdown element. */
		_removeElem: function (elem) {
			this._timerElems = $.map(this._timerElems, function (value) {
				return value === elem ? null : value;
			}); // delete entry
		},

		/** Update each active timer element.
			@private */
		_updateElems: function () {
			for (var i = this._timerElems.length - 1; i >= 0; i--) {
				this._updateCountdown(this._timerElems[i]);
			}
		},

		_optionsChanged: function (elem, inst, options) {
			if (options.layout) {
				options.layout = options.layout
					.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>');
			}
			this._resetExtraLabels(inst.options, options);
			var timezoneChanged = inst.options.timezone !== options.timezone;
			$.extend(inst.options, options);
			this._adjustSettings(
				elem,
				inst,
				!this._eqNull(options.until) ||
					!this._eqNull(options.since) ||
					timezoneChanged
			);
			var now = new Date();
			if (
				(inst._since && inst._since < now) ||
				(inst._until && inst._until > now)
			) {
				this._addElem(elem[0]);
			}
			this._updateCountdown(elem, inst);
		},

		/** Redisplay the countdown with an updated display.
			@private
			@param {Element|jQuery} elem The containing element.
			@param {object} inst The current settings for this instance. */
		_updateCountdown: function (elem, inst) {
			elem = elem.jquery ? elem : $(elem);
			inst = inst || this._getInst(elem);
			if (!inst) {
				return;
			}
			elem.html(this._generateHTML(inst)).toggleClass(
				this._rtlClass,
				inst.options.isRTL
			);
			if (inst._hold !== 'pause' && $.isFunction(inst.options.onTick)) {
				var periods =
					inst._hold !== 'lap'
						? inst._periods
						: this._calculatePeriods(
								inst,
								inst._show,
								inst.options.significant,
								new Date()
						  );
				if (
					inst.options.tickInterval === 1 ||
					this.periodsToSeconds(periods) %
						inst.options.tickInterval ===
						0
				) {
					inst.options.onTick.apply(elem[0], [periods]);
				}
			}
			var expired =
				inst._hold !== 'pause' &&
				(inst._since
					? inst._now.getTime() < inst._since.getTime()
					: inst._now.getTime() >= inst._until.getTime());
			if (expired && !inst._expiring) {
				inst._expiring = true;
				if (this._hasElem(elem[0]) || inst.options.alwaysExpire) {
					this._removeElem(elem[0]);
					if ($.isFunction(inst.options.onExpiry)) {
						inst.options.onExpiry.apply(elem[0], []);
					}
					if (inst.options.expiryText) {
						var layout = inst.options.layout;
						inst.options.layout = inst.options.expiryText;
						this._updateCountdown(elem[0], inst);
						inst.options.layout = layout;
					}
					if (inst.options.expiryUrl) {
						window.location = inst.options.expiryUrl;
					}
				}
				inst._expiring = false;
			} else if (inst._hold === 'pause') {
				this._removeElem(elem[0]);
			}
		},

		/** Reset any extra labelsn and compactLabelsn entries if changing labels.
			@private
			@param {object} base The options to be updated.
			@param {object} options The new option values. */
		_resetExtraLabels: function (base, options) {
			var n = null;
			for (n in options) {
				if (n.match(/[Ll]abels[02-9]|compactLabels1/)) {
					base[n] = options[n];
				}
			}
			for (n in base) {
				// Remove custom numbered labels
				if (
					n.match(/[Ll]abels[02-9]|compactLabels1/) &&
					typeof options[n] === 'undefined'
				) {
					base[n] = null;
				}
			}
		},

		/** Determine whether or not a value is equivalent to <code>null</code>.
			@private
			@param {object} value The value to test.
			@return {boolean} <code>true</code> if equivalent to <code>null</code>, <code>false</code> if not. */
		_eqNull: function (value) {
			return typeof value === 'undefined' || value === null;
		},

		/** Calculate internal settings for an instance.
			@private
			@param {jQuery} elem The containing element.
			@param {object} inst The current settings for this instance.
			@param {boolean} recalc <code>true</code> if until or since are set. */
		_adjustSettings: function (elem, inst, recalc) {
			var serverEntry = null;
			for (var i = 0; i < this._serverSyncs.length; i++) {
				if (this._serverSyncs[i][0] === inst.options.serverSync) {
					serverEntry = this._serverSyncs[i][1];
					break;
				}
			}
			var now = null;
			var serverOffset = null;
			if (!this._eqNull(serverEntry)) {
				now = new Date();
				serverOffset = inst.options.serverSync ? serverEntry : 0;
			} else {
				var serverResult = $.isFunction(inst.options.serverSync)
					? inst.options.serverSync.apply(elem[0], [])
					: null;
				now = new Date();
				serverOffset = serverResult
					? now.getTime() - serverResult.getTime()
					: 0;
				this._serverSyncs.push([inst.options.serverSync, serverOffset]);
			}
			var timezone = inst.options.timezone;
			timezone = this._eqNull(timezone)
				? -now.getTimezoneOffset()
				: timezone;
			if (
				recalc ||
				(!recalc &&
					this._eqNull(inst._until) &&
					this._eqNull(inst._since))
			) {
				inst._since = inst.options.since;
				if (!this._eqNull(inst._since)) {
					inst._since = this.UTCDate(
						timezone,
						this._determineTime(inst._since, null)
					);
					if (inst._since && serverOffset) {
						inst._since.setMilliseconds(
							inst._since.getMilliseconds() + serverOffset
						);
					}
				}
				inst._until = this.UTCDate(
					timezone,
					this._determineTime(inst.options.until, now)
				);
				if (serverOffset) {
					inst._until.setMilliseconds(
						inst._until.getMilliseconds() + serverOffset
					);
				}
			}
			inst._show = this._determineShow(inst);
		},

		/** Remove the countdown widget from an element.
			@private
			@param {jQuery} elem The containing element.
			@param {object} inst The current instance object. */
		_preDestroy: function (elem, inst) {
			// jshint unused:false
			this._removeElem(elem[0]);
			elem.empty();
		},

		/** Pause a countdown widget at the current time.
			Stop it running but remember and display the current time.
			@param {Element} elem The containing element.
			@example $(selector).countdown('pause') */
		pause: function (elem) {
			this._hold(elem, 'pause');
		},

		/** Pause a countdown widget at the current time.
			Stop the display but keep the countdown running.
			@param {Element} elem The containing element.
			@example $(selector).countdown('lap') */
		lap: function (elem) {
			this._hold(elem, 'lap');
		},

		/** Resume a paused countdown widget.
			@param {Element} elem The containing element.
			@example $(selector).countdown('resume') */
		resume: function (elem) {
			this._hold(elem, null);
		},

		/** Toggle a paused countdown widget.
			@param {Element} elem The containing element.
			@example $(selector).countdown('toggle') */
		toggle: function (elem) {
			var inst = $.data(elem, this.name) || {};
			this[!inst._hold ? 'pause' : 'resume'](elem);
		},

		/** Toggle a lapped countdown widget.
			@param {Element} elem The containing element.
			@example $(selector).countdown('toggleLap') */
		toggleLap: function (elem) {
			var inst = $.data(elem, this.name) || {};
			this[!inst._hold ? 'lap' : 'resume'](elem);
		},

		/** Pause or resume a countdown widget.
			@private
			@param {Element} elem The containing element.
			@param {string} hold The new hold setting. */
		_hold: function (elem, hold) {
			var inst = $.data(elem, this.name);
			if (inst) {
				if (inst._hold === 'pause' && !hold) {
					inst._periods = inst._savePeriods;
					var sign = inst._since ? '-' : '+';
					inst[inst._since ? '_since' : '_until'] =
						this._determineTime(
							sign +
								inst._periods[0] +
								'y' +
								sign +
								inst._periods[1] +
								'o' +
								sign +
								inst._periods[2] +
								'w' +
								sign +
								inst._periods[3] +
								'd' +
								sign +
								inst._periods[4] +
								'h' +
								sign +
								inst._periods[5] +
								'm' +
								sign +
								inst._periods[6] +
								's'
						);
					this._addElem(elem);
				}
				inst._hold = hold;
				inst._savePeriods = hold === 'pause' ? inst._periods : null;
				$.data(elem, this.name, inst);
				this._updateCountdown(elem, inst);
			}
		},

		/** Return the current time periods, broken down by years, months, weeks, days, hours, minutes, and seconds.
			@param {Element} elem The containing element.
			@return {number[]} The current periods for the countdown.
			@example var periods = $(selector).countdown('getTimes') */
		getTimes: function (elem) {
			var inst = $.data(elem, this.name);
			return !inst
				? null
				: inst._hold === 'pause'
				? inst._savePeriods
				: !inst._hold
				? inst._periods
				: this._calculatePeriods(
						inst,
						inst._show,
						inst.options.significant,
						new Date()
				  );
		},

		/** A time may be specified as an exact value or a relative one.
			@private
			@param {string|number|Date} setting The date/time value as a relative or absolute value.
			@param {Date} defaultTime The date/time to use if no other is supplied.
			@return {Date} The corresponding date/time. */
		_determineTime: function (setting, defaultTime) {
			var self = this;
			var offsetNumeric = function (offset) {
				// e.g. +300, -2
				var time = new Date();
				time.setTime(time.getTime() + offset * 1000);
				return time;
			};
			var offsetString = function (offset) {
				// e.g. '+2d', '-4w', '+3h +30m'
				offset = offset.toLowerCase();
				var time = new Date();
				var year = time.getFullYear();
				var month = time.getMonth();
				var day = time.getDate();
				var hour = time.getHours();
				var minute = time.getMinutes();
				var second = time.getSeconds();
				var pattern = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;
				var matches = pattern.exec(offset);
				while (matches) {
					switch (matches[2] || 's') {
						case 's':
							second += parseInt(matches[1], 10);
							break;
						case 'm':
							minute += parseInt(matches[1], 10);
							break;
						case 'h':
							hour += parseInt(matches[1], 10);
							break;
						case 'd':
							day += parseInt(matches[1], 10);
							break;
						case 'w':
							day += parseInt(matches[1], 10) * 7;
							break;
						case 'o':
							month += parseInt(matches[1], 10);
							day = Math.min(
								day,
								self._getDaysInMonth(year, month)
							);
							break;
						case 'y':
							year += parseInt(matches[1], 10);
							day = Math.min(
								day,
								self._getDaysInMonth(year, month)
							);
							break;
					}
					matches = pattern.exec(offset);
				}
				return new Date(year, month, day, hour, minute, second, 0);
			};
			var time = this._eqNull(setting)
				? defaultTime
				: typeof setting === 'string'
				? offsetString(setting)
				: typeof setting === 'number'
				? offsetNumeric(setting)
				: setting;
			if (time) {
				time.setMilliseconds(0);
			}
			return time;
		},

		/** Determine the number of days in a month.
			@private
			@param {number} year The year.
			@param {number} month The month.
			@return {number} The days in that month. */
		_getDaysInMonth: function (year, month) {
			return 32 - new Date(year, month, 32).getDate();
		},

		/** Default implementation to determine which set of labels should be used for an amount.
			Use the <code>labels</code> attribute with the same numeric suffix (if it exists).
			@private
			@param {number} num The amount to be displayed.
			@return {number} The set of labels to be used for this amount. */
		_normalLabels: function (num) {
			return num;
		},

		/** Generate the HTML to display the countdown widget.
			@private
			@param {object} inst The current settings for this instance.
			@return {string} The new HTML for the countdown display. */
		_generateHTML: function (inst) {
			var self = this;
			// Determine what to show
			inst._periods = inst._hold
				? inst._periods
				: this._calculatePeriods(
						inst,
						inst._show,
						inst.options.significant,
						new Date()
				  );
			// Show all 'asNeeded' after first non-zero value
			var shownNonZero = false;
			var showCount = 0;
			var sigCount = inst.options.significant;
			var show = $.extend({}, inst._show);
			var period = null;
			for (period = Y; period <= S; period++) {
				shownNonZero =
					shownNonZero ||
					(inst._show[period] === '?' && inst._periods[period] > 0);
				show[period] =
					inst._show[period] === '?' && !shownNonZero
						? null
						: inst._show[period];
				showCount += show[period] ? 1 : 0;
				sigCount -= inst._periods[period] > 0 ? 1 : 0;
			}
			var showSignificant = [
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			];
			for (period = S; period >= Y; period--) {
				// Determine significant periods
				if (inst._show[period]) {
					if (inst._periods[period]) {
						showSignificant[period] = true;
					} else {
						showSignificant[period] = sigCount > 0;
						sigCount--;
					}
				}
			}
			var labels = inst.options.compact
				? inst.options.compactLabels
				: inst.options.labels;
			var whichLabels = inst.options.whichLabels || this._normalLabels;
			var showCompact = function (period) {
				var labelsNum =
					inst.options[
						'compactLabels' + whichLabels(inst._periods[period])
					];
				return show[period]
					? self._translateDigits(inst, inst._periods[period]) +
							(labelsNum ? labelsNum[period] : labels[period]) +
							' '
					: '';
			};
			var minDigits = inst.options.padZeroes ? 2 : 1;
			var showFull = function (period) {
				var labelsNum =
					inst.options['labels' + whichLabels(inst._periods[period])];
				return (!inst.options.significant && show[period]) ||
					(inst.options.significant && showSignificant[period])
					? '<span class="' +
							self._sectionClass +
							'">' +
							'<span class="' +
							self._amountClass +
							'">' +
							self._minDigits(
								inst,
								inst._periods[period],
								minDigits
							) +
							'</span>' +
							'<span class="' +
							self._periodClass +
							'">' +
							(labelsNum ? labelsNum[period] : labels[period]) +
							'</span></span>'
					: '';
			};
			return inst.options.layout
				? this._buildLayout(
						inst,
						show,
						inst.options.layout,
						inst.options.compact,
						inst.options.significant,
						showSignificant
				  )
				: (inst.options.compact // Compact version
						? '<span class="' +
						  this._rowClass +
						  ' ' +
						  this._amountClass +
						  (inst._hold ? ' ' + this._holdingClass : '') +
						  '">' +
						  showCompact(Y) +
						  showCompact(O) +
						  showCompact(W) +
						  showCompact(D) +
						  (show[H]
								? this._minDigits(inst, inst._periods[H], 2)
								: '') +
						  (show[M]
								? (show[H] ? inst.options.timeSeparator : '') +
								  this._minDigits(inst, inst._periods[M], 2)
								: '') +
						  (show[S]
								? (show[H] || show[M]
										? inst.options.timeSeparator
										: '') +
								  this._minDigits(inst, inst._periods[S], 2)
								: '')
						: // Full version
						  '<span class="' +
						  this._rowClass +
						  ' ' +
						  this._showClass +
						  (inst.options.significant || showCount) +
						  (inst._hold ? ' ' + this._holdingClass : '') +
						  '">' +
						  showFull(Y) +
						  showFull(O) +
						  showFull(W) +
						  showFull(D) +
						  showFull(H) +
						  showFull(M) +
						  showFull(S)) +
						'</span>' +
						(inst.options.description
							? '<span class="' +
							  this._rowClass +
							  ' ' +
							  this._descrClass +
							  '">' +
							  inst.options.description +
							  '</span>'
							: '');
		},

		/** Construct a custom layout.
			@private
			@param {object} inst The current settings for this instance.
			@param {boolean[]} show Flags indicating which periods are requested.
			@param {string} layout The customised layout.
			@param {boolean} compact <code>true</code> if using compact labels.
			@param {number} significant The number of periods with values to show, zero for all.
			@param {boolean[]} showSignificant Other periods to show for significance.
			@return {string} The custom HTML. */
		_buildLayout: function (
			inst,
			show,
			layout,
			compact,
			significant,
			showSignificant
		) {
			var labels = inst.options[compact ? 'compactLabels' : 'labels'];
			var whichLabels = inst.options.whichLabels || this._normalLabels;
			var labelFor = function (index) {
				return (inst.options[
					(compact ? 'compactLabels' : 'labels') +
						whichLabels(inst._periods[index])
				] || labels)[index];
			};
			var digit = function (value, position) {
				return inst.options.digits[Math.floor(value / position) % 10];
			};
			var subs = {
				desc: inst.options.description,
				sep: inst.options.timeSeparator,
				yl: labelFor(Y),
				yn: this._minDigits(inst, inst._periods[Y], 1),
				ynn: this._minDigits(inst, inst._periods[Y], 2),
				ynnn: this._minDigits(inst, inst._periods[Y], 3),
				y1: digit(inst._periods[Y], 1),
				y10: digit(inst._periods[Y], 10),
				y100: digit(inst._periods[Y], 100),
				y1000: digit(inst._periods[Y], 1000),
				ol: labelFor(O),
				on: this._minDigits(inst, inst._periods[O], 1),
				onn: this._minDigits(inst, inst._periods[O], 2),
				onnn: this._minDigits(inst, inst._periods[O], 3),
				o1: digit(inst._periods[O], 1),
				o10: digit(inst._periods[O], 10),
				o100: digit(inst._periods[O], 100),
				o1000: digit(inst._periods[O], 1000),
				wl: labelFor(W),
				wn: this._minDigits(inst, inst._periods[W], 1),
				wnn: this._minDigits(inst, inst._periods[W], 2),
				wnnn: this._minDigits(inst, inst._periods[W], 3),
				w1: digit(inst._periods[W], 1),
				w10: digit(inst._periods[W], 10),
				w100: digit(inst._periods[W], 100),
				w1000: digit(inst._periods[W], 1000),
				dl: labelFor(D),
				dn: this._minDigits(inst, inst._periods[D], 1),
				dnn: this._minDigits(inst, inst._periods[D], 2),
				dnnn: this._minDigits(inst, inst._periods[D], 3),
				d1: digit(inst._periods[D], 1),
				d10: digit(inst._periods[D], 10),
				d100: digit(inst._periods[D], 100),
				d1000: digit(inst._periods[D], 1000),
				hl: labelFor(H),
				hn: this._minDigits(inst, inst._periods[H], 1),
				hnn: this._minDigits(inst, inst._periods[H], 2),
				hnnn: this._minDigits(inst, inst._periods[H], 3),
				h1: digit(inst._periods[H], 1),
				h10: digit(inst._periods[H], 10),
				h100: digit(inst._periods[H], 100),
				h1000: digit(inst._periods[H], 1000),
				ml: labelFor(M),
				mn: this._minDigits(inst, inst._periods[M], 1),
				mnn: this._minDigits(inst, inst._periods[M], 2),
				mnnn: this._minDigits(inst, inst._periods[M], 3),
				m1: digit(inst._periods[M], 1),
				m10: digit(inst._periods[M], 10),
				m100: digit(inst._periods[M], 100),
				m1000: digit(inst._periods[M], 1000),
				sl: labelFor(S),
				sn: this._minDigits(inst, inst._periods[S], 1),
				snn: this._minDigits(inst, inst._periods[S], 2),
				snnn: this._minDigits(inst, inst._periods[S], 3),
				s1: digit(inst._periods[S], 1),
				s10: digit(inst._periods[S], 10),
				s100: digit(inst._periods[S], 100),
				s1000: digit(inst._periods[S], 1000),
			};
			var html = layout;
			// Replace period containers: {p<}...{p>}
			for (var i = Y; i <= S; i++) {
				var period = 'yowdhms'.charAt(i);
				var re = new RegExp(
					'\\{' + period + '<\\}([\\s\\S]*)\\{' + period + '>\\}',
					'g'
				);
				html = html.replace(
					re,
					(!significant && show[i]) ||
						(significant && showSignificant[i])
						? '$1'
						: ''
				);
			}
			// Replace period values: {pn}
			$.each(subs, function (n, v) {
				var re = new RegExp('\\{' + n + '\\}', 'g');
				html = html.replace(re, v);
			});
			return html;
		},

		/** Ensure a numeric value has at least n digits for display.
			@private
			@param {object} inst The current settings for this instance.
			@param {number} value The value to display.
			@param {number} len The minimum length.
			@return {string} The display text. */
		_minDigits: function (inst, value, len) {
			value = '' + value;
			if (value.length >= len) {
				return this._translateDigits(inst, value);
			}
			value = '0000000000' + value;
			return this._translateDigits(
				inst,
				value.substr(value.length - len)
			);
		},

		/** Translate digits into other representations.
			@private
			@param {object} inst The current settings for this instance.
			@param {string} value The text to translate.
			@return {string} The translated text. */
		_translateDigits: function (inst, value) {
			return ('' + value).replace(/[0-9]/g, function (digit) {
				return inst.options.digits[digit];
			});
		},

		/** Translate the format into flags for each period.
			@private
			@param {object} inst The current settings for this instance.
			@return {string[]} Flags indicating which periods are requested (?) or
					required (!) by year, month, week, day, hour, minute, second. */
		_determineShow: function (inst) {
			var format = inst.options.format;
			var show = [];
			show[Y] = format.match('y') ? '?' : format.match('Y') ? '!' : null;
			show[O] = format.match('o') ? '?' : format.match('O') ? '!' : null;
			show[W] = format.match('w') ? '?' : format.match('W') ? '!' : null;
			show[D] = format.match('d') ? '?' : format.match('D') ? '!' : null;
			show[H] = format.match('h') ? '?' : format.match('H') ? '!' : null;
			show[M] = format.match('m') ? '?' : format.match('M') ? '!' : null;
			show[S] = format.match('s') ? '?' : format.match('S') ? '!' : null;
			return show;
		},

		/** Calculate the requested periods between now and the target time.
			@private
			@param {object} inst The current settings for this instance.
			@param {string[]} show Flags indicating which periods are requested/required.
			@param {number} significant The number of periods with values to show, zero for all.
			@param {Date} now The current date and time.
			@return {number[]} The current time periods (always positive)
					by year, month, week, day, hour, minute, second. */
		_calculatePeriods: function (inst, show, significant, now) {
			// Find endpoints
			inst._now = now;
			inst._now.setMilliseconds(0);
			var until = new Date(inst._now.getTime());
			if (inst._since) {
				if (now.getTime() < inst._since.getTime()) {
					inst._now = now = until;
				} else {
					now = inst._since;
				}
			} else {
				until.setTime(inst._until.getTime());
				if (now.getTime() > inst._until.getTime()) {
					inst._now = now = until;
				}
			}
			// Calculate differences by period
			var periods = [0, 0, 0, 0, 0, 0, 0];
			if (show[Y] || show[O]) {
				// Treat end of months as the same
				var lastNow = this._getDaysInMonth(
					now.getFullYear(),
					now.getMonth()
				);
				var lastUntil = this._getDaysInMonth(
					until.getFullYear(),
					until.getMonth()
				);
				var sameDay =
					until.getDate() === now.getDate() ||
					(until.getDate() >= Math.min(lastNow, lastUntil) &&
						now.getDate() >= Math.min(lastNow, lastUntil));
				var getSecs = function (date) {
					return (
						(date.getHours() * 60 + date.getMinutes()) * 60 +
						date.getSeconds()
					);
				};
				var months = Math.max(
					0,
					(until.getFullYear() - now.getFullYear()) * 12 +
						until.getMonth() -
						now.getMonth() +
						((until.getDate() < now.getDate() && !sameDay) ||
						(sameDay && getSecs(until) < getSecs(now))
							? -1
							: 0)
				);
				periods[Y] = show[Y] ? Math.floor(months / 12) : 0;
				periods[O] = show[O] ? months - periods[Y] * 12 : 0;
				// Adjust for months difference and end of month if necessary
				now = new Date(now.getTime());
				var wasLastDay = now.getDate() === lastNow;
				var lastDay = this._getDaysInMonth(
					now.getFullYear() + periods[Y],
					now.getMonth() + periods[O]
				);
				if (now.getDate() > lastDay) {
					now.setDate(lastDay);
				}
				now.setFullYear(now.getFullYear() + periods[Y]);
				now.setMonth(now.getMonth() + periods[O]);
				if (wasLastDay) {
					now.setDate(lastDay);
				}
			}
			var diff = Math.floor((until.getTime() - now.getTime()) / 1000);
			var period = null;
			var extractPeriod = function (period, numSecs) {
				periods[period] = show[period] ? Math.floor(diff / numSecs) : 0;
				diff -= periods[period] * numSecs;
			};
			extractPeriod(W, 604800);
			extractPeriod(D, 86400);
			extractPeriod(H, 3600);
			extractPeriod(M, 60);
			extractPeriod(S, 1);
			if (diff > 0 && !inst._since) {
				// Round up if left overs
				var multiplier = [1, 12, 4.3482, 7, 24, 60, 60];
				var lastShown = S;
				var max = 1;
				for (period = S; period >= Y; period--) {
					if (show[period]) {
						if (periods[lastShown] >= max) {
							periods[lastShown] = 0;
							diff = 1;
						}
						if (diff > 0) {
							periods[period]++;
							diff = 0;
							lastShown = period;
							max = 1;
						}
					}
					max *= multiplier[period];
				}
			}
			if (significant) {
				// Zero out insignificant periods
				for (period = Y; period <= S; period++) {
					if (significant && periods[period]) {
						significant--;
					} else if (!significant) {
						periods[period] = 0;
					}
				}
			}
			return periods;
		},
	});
})(jQuery);
