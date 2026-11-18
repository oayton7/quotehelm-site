"""Cartoon sound effects, generated from maths. No samples, no licences, no network.
Usage: python3 -I sfx.py cues.json out.wav
cues.json: {"duration": 30, "cues": [{"t": 1.2, "type": "pop"}, ...]}
Types: buzz (phone vibrating, ~1.5 s), ring (UK phone ring, ~2.4 s), pop, ping (notification),
tick, scribble, boing, whoosh, drip, splash, sigh-horn (sad trombone), chime (end card), tap (typing)."""
import json, math, random, struct, sys, wave
R = 44100
spec = json.load(open(sys.argv[1]))
N = int(R * spec["duration"]); buf = [0.0] * N
def add(t0, dur, f, gain=1.0):
    a = int(t0 * R)
    for i in range(int(dur * R)):
        if 0 <= a + i < N: buf[a + i] += gain * f(i / R)
sq = lambda x: 1.0 if math.sin(x) > 0 else -1.0
rnd = random.Random(7)
def buzz(t0, g):
    for k in range(3): add(t0 + k * .5, .3, lambda t: .3 * sq(2*math.pi*170*t) * math.sin(math.pi*t/.3), g)
def ring(t0, g):
    for k in (0, .6): add(t0 + k, .4, lambda t: .22*(math.sin(2*math.pi*400*t)+math.sin(2*math.pi*450*t)) * min(1, t*40, (.4-t)*40), g)
def pop(t0, g, f=520): add(t0, .12, lambda t: .5*math.sin(2*math.pi*(f+2200*t)*t)*math.exp(-t*30), g)
def ping(t0, g):
    for f, d in ((1319, 0), (1760, .12)): add(t0+d, .6, lambda t, f=f: .32*math.sin(2*math.pi*f*t)*math.exp(-t*7), g)
def tick(t0, g): add(t0, .08, lambda t: .4*math.sin(2*math.pi*1500*t)*math.exp(-t*50), g)
def tap(t0, g):
    for k in range(5): add(t0 + k*.11 + rnd.random()*.03, .03, lambda t: .3*(rnd.random()*2-1)*math.exp(-t*120), g)
def scribble(t0, g): add(t0, .5, lambda t: .16*(rnd.random()*2-1)*(.5+.5*math.sin(2*math.pi*9*t))*math.exp(-t*2), g)
def boing(t0, g): add(t0, .5, lambda t: .4*math.sin(2*math.pi*(180+120*math.sin(2*math.pi*9*t)*math.exp(-t*4))*t)*math.exp(-t*5), g)
def whoosh(t0, g): add(t0, .45, lambda t: .2*(rnd.random()*2-1)*math.sin(math.pi*t/.45), g)
def drip(t0, g): add(t0, .15, lambda t: .45*math.sin(2*math.pi*(900+3500*t)*t)*math.exp(-t*35), g)
def splash(t0, g): add(t0, .6, lambda t: .3*(rnd.random()*2-1)*math.exp(-t*8), g)
def sighhorn(t0, g):
    for k, f in enumerate((392, 370, 349, 330)):
        d = .9 if k == 3 else .35
        add(t0+k*.38, d, lambda t, f=f, d=d: .25*(sq(2*math.pi*f*t)*.4+math.sin(2*math.pi*f*t))*min(1, t*30, (d-t)*10)*(1+.05*math.sin(2*math.pi*6*t)), g)
def chime(t0, g):
    for f, d in ((523, 0), (659, .15), (784, .3)): add(t0+d, 1.2, lambda t, f=f: .22*math.sin(2*math.pi*f*t)*math.exp(-t*3), g)
FX = dict(buzz=buzz, ring=ring, pop=pop, ping=ping, tick=tick, tap=tap, scribble=scribble, boing=boing,
          whoosh=whoosh, drip=drip, splash=splash, **{"sigh-horn": sighhorn}, chime=chime)
for c in spec["cues"]:
    FX[c["type"]](c["t"], c.get("gain", 1.0))
w = wave.open(sys.argv[2], "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(R)
w.writeframes(b"".join(struct.pack("<h", int(max(-1, min(1, x)) * 30000)) for x in buf)); w.close()
