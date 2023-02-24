from flask import render_template,request,Flask
#from Steam import steam_calculator
import numpy as np
import pandas as pd
#import matplotlib.pyplot as plt
import plotly.express as px

from scipy.interpolate import griddata

df_t= pd.read_csv("SST.csv")
df_p= pd.read_csv("SSP.csv")
df_c1= pd.read_csv("CLS.csv")
df_t.rename(columns={'T (C)':'Temperature'},inplace=True)
df_c=df_c1[df_c1["Phase"].isin(['Liquid','Vapor','SupercriticalFluid'])]
de=df_c1[df_c1["Phase"].isin(['SaturatedVapor','SaturatedLiquid'])]

df_c['Phase']=df_c['Phase'].astype(str)
df_c.dropna(inplace=True)
df_c=df_c.reset_index(drop=True)
df=df_c


def steam_calculator(p,t):


    points = np.array(list(zip(df['Pressure(MPa)'], df['Temperature'])))
    values = np.array(list(zip(df['Specific_Enthalpy'],df['Specific_Entropy'],df['Specific_Internal_Energy'],df['Specific_Volume'],df['Density'])))
    interpolated_value = griddata(points, values, (p,t), method='linear')
    k=interpolated_value

    Phase=[]

    Enthalpy=round(float(k[0]),2)
    Entropy=round(float(k[1]),2)
    Internal_energy=round(float(k[2]),2)
    Specific_volume=round(float(k[3]),5)
    Density=round(float(k[4]),2)

    point = np.array(list(zip(de['Pressure(MPa)'])))
    value = np.array(list(zip(de['Temperature'])))
    q1 = griddata(point, value, (p), method='linear')
    Sat_Temp=round(float(q1[0]),2)

    if p<22.12 and t > Sat_Temp :
        Phase='Vapor'
    elif p<22.12 and t < Sat_Temp :
        Phase='Liquid'
    elif p<22.12 and t==Sat_Temp :
        Phase='Saturation Temperature'
    elif p > 22.12 and t > 374 :
        Phase='Super Critical Fluid'
        Sat_Temp='No Saturation Temperature'
    elif p > 22.12 and t < 374:
        Phase='Liquid'
        Sat_Temp='No Saturation Temperature'


    Ph=Phase



    return Enthalpy,Entropy,Ph,Sat_Temp,Specific_volume,Density,Internal_energy

def steam_entropy(p,s):
    
    if p<22.12 :
        point = np.array(list(zip(df_p['P (MPa)'])))
        value = np.array(list(zip(df_p['Entropy Vapor [kJ/(kg K)]'],df_p['Entropy Liquid [kJ/(kg K)]'])))
        interpolated_value = griddata(point, value, (p), method='linear')
        k=interpolated_value
        ETRV=k[0]
        ETRL=k[1]
        if s < ETRV and s > ETRL:
            q='L22.12 In'
            points = np.array(list(zip(df_p['P (MPa)'])))
            values = np.array(list(zip(df_p['T (C)'],df_p['Specific Volume Liquid (m^3/kg)'],df_p['Specific Volume Vapor (m^3/kg)'],df_p['Internal Energy Liquid (kJ/kg)'],df_p['Internal Energy Vapor (kJ/kg)'],df_p['Internal Energy of Vaporization (kJ/kg)'],df_p['Enthalpy Liquid (kJ/kg)'],df_p['Enthalpy Vapor (kJ/kg)'],df_p['Enthalpy of Vaporization (kJ/kg)'],df_p['Entropy Liquid [kJ/(kg K)]'],df_p['Entropy Vapor [kJ/(kg K)]'],df_p['Entropy of Vaporization [kJ/(kg K)]'])))
            interpolated_value = griddata(points, values, (p), method='linear')
            k=interpolated_value
            Sat_Temp=k[0]
            t=round(Sat_Temp,2)
            SVL=k[1]
            SVV=k[2]
            IEL=k[3]
            IEV=k[4]
            EL=k[6]
            EV=k[7]
            ETRL=k[9]
            ETRV=k[10]
            x = round((s-ETRL)/(ETRV-ETRL),3)
            Enthalpy=round(EL+x*(EV-EL),2)
            Specific_volume=round(SVL+x*(SVV-SVL),5)
            Internal_energy=round(IEL+x*(IEV-IEL),2)
            Density=round((1/Specific_volume),3)
            Ph = 'Saturated'
        elif s>ETRV or s<ETRL:
            q='L22.12 away'
            points = np.array(list(zip(df['Pressure(MPa)'], df['Specific_Entropy'])))
            values = np.array(list(zip(df['Temperature'],df['Specific_Enthalpy'],df['Specific_Internal_Energy'],df['Specific_Volume'],df['Density'])))
            interpolated_value = griddata(points, values, (p,s), method='linear')
            k=interpolated_value
            Phase=[]
            t=round(float(k[0]),2)
            Enthalpy=round(float(k[1]),2)
            Internal_energy=round(float(k[2]),2)
            Specific_volume=round(float(k[3]),5)
            Density=round(float(k[4]),2)
            point = np.array(list(zip(de['Pressure(MPa)'])))
            value = np.array(list(zip(de['Temperature'])))
            q1 = griddata(point, value, (p), method='linear')
            Sat_Temp=round(float(q1[0]),2)
            
            if p<22.12 and t > Sat_Temp :
                x=1
                Phase='Vapor'
            elif p<22.12 and t < Sat_Temp :
                x=0
                Phase='Liquid'
            elif p<22.12 and t==Sat_Temp :
                Phase='Saturation Temperature'
            Ph=Phase
    else:
        q='g22.12'
        points = np.array(list(zip(df['Pressure(MPa)'], df['Specific_Entropy'])))
        values = np.array(list(zip(df['Temperature'],df['Specific_Enthalpy'],df['Specific_Internal_Energy'],df['Specific_Volume'],df['Density'])))
        interpolated_value = griddata(points, values, (p,s), method='linear')
        k=interpolated_value
        Phase=[]
        t=round(float(k[0]),2)
        Enthalpy=round(float(k[1]),2)
        Internal_energy=round(float(k[2]),2)
        Specific_volume=round(float(k[3]),5)
        Density=round(float(k[4]),2)
        point = np.array(list(zip(de['Pressure(MPa)'])))
        value = np.array(list(zip(de['Temperature'])))
        q1 = griddata(point, value, (p), method='linear')
        Sat_Temp=round(float(q1[0]),2)
        
        if p > 22.12 and t > 374 :
            Phase='Super Critical Fluid'
            x=1
        elif p > 22.12 and t < 374:
            x=0
            Phase='Liquid'
            Sat_Temp='No Saturation Temperature'
        Ph=Phase
    return t,Enthalpy,Ph,Sat_Temp,Specific_volume,Density,Internal_energy,x

def steam_enthalpy(p,h):
    
    if p<22.12 :
        point = np.array(list(zip(df_p['P (MPa)'])))
        value = np.array(list(zip(df_p['Enthalpy Vapor (kJ/kg)'],df_p['Enthalpy Liquid (kJ/kg)'])))
        interpolated_value = griddata(point, value, (p), method='linear')
        k=interpolated_value
        EV=k[0]
        EL=k[1]
        if h < EV and h > EL:
            q='L22.12 In'
            points = np.array(list(zip(df_p['P (MPa)'])))
            values = np.array(list(zip(df_p['T (C)'],df_p['Specific Volume Liquid (m^3/kg)'],df_p['Specific Volume Vapor (m^3/kg)'],df_p['Internal Energy Liquid (kJ/kg)'],df_p['Internal Energy Vapor (kJ/kg)'],df_p['Internal Energy of Vaporization (kJ/kg)'],df_p['Enthalpy Liquid (kJ/kg)'],df_p['Enthalpy Vapor (kJ/kg)'],df_p['Enthalpy of Vaporization (kJ/kg)'],df_p['Entropy Liquid [kJ/(kg K)]'],df_p['Entropy Vapor [kJ/(kg K)]'],df_p['Entropy of Vaporization [kJ/(kg K)]'])))
            interpolated_value = griddata(points, values, (p), method='linear')
            k=interpolated_value
            Sat_Temp=k[0]
            t=round(Sat_Temp,2)
            SVL=k[1]
            SVV=k[2]
            IEL=k[3]
            IEV=k[4]
            EL=k[6]
            EV=k[7]
            ETRL=k[9]
            ETRV=k[10]
            x = round((h-EL)/(EV-EL),3)
            Entropy=round(ETRL+x*(ETRV-ETRL),2)
            Specific_volume=round(SVL+x*(SVV-SVL),5)
            Internal_energy=round(IEL+x*(IEV-IEL),2)
            Density=round((1/Specific_volume),3)
            Ph = 'Saturated'
        elif h>EV or h<EL:
            q='L22.12 away'
            points = np.array(list(zip(df['Pressure(MPa)'], df['Specific_Enthalpy'])))
            values = np.array(list(zip(df['Temperature'],df['Specific_Entropy'],df['Specific_Internal_Energy'],df['Specific_Volume'],df['Density'])))
            interpolated_value = griddata(points, values, (p,h), method='linear')
            k=interpolated_value
            Phase=[]
            t=round(float(k[0]),2)
            Entropy=round(float(k[1]),2)
            Internal_energy=round(float(k[2]),2)
            
            Density=round(float(k[4]),2)
            Specific_volume=round((1/Density),5)

            point = np.array(list(zip(de['Pressure(MPa)'])))
            value = np.array(list(zip(de['Temperature'])))
            q1 = griddata(point, value, (p), method='linear')
            Sat_Temp=round(float(q1[0]),2)
            
            if p<22.12 and t > Sat_Temp :
                x=1
                Phase='Vapor'
            elif p<22.12 and t < Sat_Temp :
                x=0
                Phase='Liquid'
            elif p<22.12 and t==Sat_Temp :
                Phase='Saturation Temperature'
            Ph=Phase
    else:
        q='g22.12'
        points = np.array(list(zip(df['Pressure(MPa)'], df['Specific_Enthalpy'])))
        values = np.array(list(zip(df['Temperature'],df['Specific_Entropy'],df['Specific_Internal_Energy'],df['Specific_Volume'],df['Density'])))
        interpolated_value = griddata(points, values, (p,h), method='linear')
        k=interpolated_value
        Phase=[]
        t=round(float(k[0]),2)
        Entropy=round(float(k[1]),2)
        Internal_energy=round(float(k[2]),2)
        
        Density=round(float(k[4]),2)
        Specific_volume=round((1/Density),5)
        point = np.array(list(zip(de['Pressure(MPa)'])))
        value = np.array(list(zip(de['Temperature'])))
        q1 = griddata(point, value, (p), method='linear')
        Sat_Temp=round(float(q1[0]),2)
        
        if p > 22.12 and t > 374 :
            x=1
            Phase='Super Critical Fluid'
        elif p > 22.12 and t < 374:
            x=0
            Phase='Liquid'
            Sat_Temp='No Saturation Temperature'
        Ph=Phase
    return t,Entropy,Ph,Sat_Temp,Specific_volume,Density,Internal_energy,x


def steam_dry(p,x):
    points = np.array(list(zip(df_p['P (MPa)'])))
    values = np.array(list(zip(df_p['T (C)'],df_p['Specific Volume Liquid (m^3/kg)'],df_p['Specific Volume Vapor (m^3/kg)'],df_p['Internal Energy Liquid (kJ/kg)'],df_p['Internal Energy Vapor (kJ/kg)'],df_p['Internal Energy of Vaporization (kJ/kg)'],df_p['Enthalpy Liquid (kJ/kg)'],df_p['Enthalpy Vapor (kJ/kg)'],df_p['Enthalpy of Vaporization (kJ/kg)'],df_p['Entropy Liquid [kJ/(kg K)]'],df_p['Entropy Vapor [kJ/(kg K)]'],df_p['Entropy of Vaporization [kJ/(kg K)]'])))
    interpolated_value = griddata(points, values, (p), method='linear')
    k=interpolated_value
    t=round(k[0],2)
    SVL=k[1]
    SVV=k[2]
    SV=round(SVL+x*(k[2]-k[1]),5)
    IEL=k[3]
    IEV=k[4]
    IE=round(IEL+x*(k[4]-k[3]),2)
    EL=k[6]
    EV=k[7]
    EVW=k[8]
    E=round(EL+x*(EV-EL),2)
    ETRL=k[9]
    ETRV=k[10]
    ETR=round(ETRL+x*(ETRV-ETRL),2)
    ETRVW=k[11]
    return t,E,SV,ETR,IE

def temp_enthalpy(t,h):
    
    if t<374 :
        point = np.array(list(zip(df_t['Temperature'])))
        value = np.array(list(zip(df_t['Enthalpy Vapor (kJ/kg)'],df_t['Enthalpy Liquid (kJ/kg)'])))
        interpolated_value = griddata(point, value, (t), method='linear')
        k=interpolated_value
        EV=k[0]
        EL=k[1]
        if h < EV and h > EL:
            q='L22.12 In'
            points = np.array(list(zip(df_t['Temperature'])))
            values = np.array(list(zip(df_t['P (MPa)'],df_t['Specific Volume Liquid (m^3/kg)'],df_t['Specific Volume Vapor (m^3/kg)'],df_t['Internal Energy Liquid (kJ/kg)'],df_t['Internal Energy Vapor (kJ/kg)'],df_t['Internal Energy of Vaporization (kJ/kg)'],df_t['Enthalpy Liquid (kJ/kg)'],df_t['Enthalpy Vapor (kJ/kg)'],df_t['Enthalpy of Vaporization'],df_t['Entropy Liquid [kJ/(kg K)]'],df_t['Entropy Vapor [kJ/(kg K)]'],df_t['Entropy of Vaporization [kJ/(kg K)]'])))
            interpolated_value = griddata(points, values, (t), method='linear')
            k=interpolated_value
            Sat_p=round(k[0],2)
            p=round(Sat_p,2)
            SVL=k[1]
            SVV=k[2]
            IEL=k[3]
            IEV=k[4]
            EL=k[6]
            EV=k[7]
            ETRL=k[9]
            ETRV=k[10]
            x = round((h-EL)/(EV-EL),3)
            Entropy=round(ETRL+x*(ETRV-ETRL),2)
            Specific_volume=round(SVL+x*(SVV-SVL),5)
            Internal_energy=round(IEL+x*(IEV-IEL),2)
            Density=round((1/Specific_volume),3)
            Ph = 'Saturated'
        elif h>EV or h<EL:
            q='L22.12 away'
            points = np.array(list(zip(df['Temperature'], df['Specific_Enthalpy'])))
            values = np.array(list(zip(df['Pressure(MPa)'],df['Specific_Entropy'],df['Specific_Internal_Energy'],df['Specific_Volume'],df['Density'])))
            interpolated_value = griddata(points, values, (t,h), method='linear')
            k=interpolated_value
            Phase=[]
            p=round(float(k[0]),2)
            Entropy=round(float(k[1]),2)
            Internal_energy=round(float(k[2]),2)
            
            Density=round(float(k[4]),2)
            Specific_volume=round((1/Density),5)
            
            point = np.array(list(zip(df_t['Temperature'])))
            value = np.array(list(zip(df_t['P (MPa)'])))
            q1 = griddata(point, value, (t), method='linear')
            Sat_p=round(float(q1[0]),2)
            
            if h > EV:
                x=1
                Phase='Vapor'
            elif h<EL :
                x=0
                Phase='Liquid'
            elif h==EV or h==EL:
                Phase='Saturation Temperature'
            Ph=Phase
    else:
        q='g22.12'
        points = np.array(list(zip(df['Temperature'], df['Specific_Enthalpy'])))
        values = np.array(list(zip(df['Pressure(MPa)'],df['Specific_Entropy'],df['Specific_Internal_Energy'],df['Specific_Volume'],df['Density'])))
        interpolated_value = griddata(points, values, (t,h), method='linear')
        k=interpolated_value
        Phase=[]
        p=round(float(k[0]),2)
        Entropy=round(float(k[1]),2)
        Internal_energy=round(float(k[2]),2)
        
        Density=round(float(k[4]),2)
        Specific_volume=round((1/Density),5)
        point = np.array(list(zip(df_t['Temperature'])))
        value = np.array(list(zip(df_t['P (MPa)'])))
        q1 = griddata(point, value, (t), method='linear')
        Sat_p=round(float(q1[0]),2)
        
        if p > 22.12 and t > 374 :
            x=1
            Phase='Super Critical Fluid'
        elif p > 22.12 and t < 374:
            x=0
            Phase='Liquid'
            Sat_Temp='No Saturation Temperature'
        Ph=Phase
    return p,Entropy,Ph,Sat_p,Specific_volume,Density,Internal_energy,x

def temp_entropy(t,s):
    
    if t<374 :
        point = np.array(list(zip(df_t['Temperature'])))
        value = np.array(list(zip(df_t['Entropy Vapor [kJ/(kg K)]'],df_t['Entropy Liquid [kJ/(kg K)]'])))
        interpolated_value = griddata(point, value, (t), method='linear')
        k=interpolated_value
        ETRV=k[0]
        ETRL=k[1]
        if s < ETRV and s > ETRL:
            q='L22.12 In'
            points = np.array(list(zip(df_t['Temperature'])))
            values = np.array(list(zip(df_t['P (MPa)'],df_t['Specific Volume Liquid (m^3/kg)'],df_t['Specific Volume Vapor (m^3/kg)'],df_t['Internal Energy Liquid (kJ/kg)'],df_t['Internal Energy Vapor (kJ/kg)'],df_t['Internal Energy of Vaporization (kJ/kg)'],df_t['Enthalpy Liquid (kJ/kg)'],df_t['Enthalpy Vapor (kJ/kg)'],df_t['Enthalpy of Vaporization'],df_t['Entropy Liquid [kJ/(kg K)]'],df_t['Entropy Vapor [kJ/(kg K)]'],df_t['Entropy of Vaporization [kJ/(kg K)]'])))
            interpolated_value = griddata(points, values, (t), method='linear')
            k=interpolated_value
            Sat_p=round(k[0],2)
            p=round(Sat_p,2)
            SVL=k[1]
            SVV=k[2]
            IEL=k[3]
            IEV=k[4]
            EL=k[6]
            EV=k[7]
            ETRL=k[9]
            ETRV=k[10]
            x = round((s-ETRL)/(ETRV-ETRL),3)
            Enthalpy=round(EL+x*(EV-EL),2)
            Specific_volume=round(SVL+x*(SVV-SVL),5)
            Internal_energy=round(IEL+x*(IEV-IEL),2)
            Density=round((1/Specific_volume),3)
            Ph = 'Saturated'
        elif s>ETRV or s<ETRL:
            q='L22.12 away'
            points = np.array(list(zip(df['Temperature'], df['Specific_Entropy'])))
            values = np.array(list(zip(df['Pressure(MPa)'],df['Specific_Enthalpy'],df['Specific_Internal_Energy'],df['Specific_Volume'],df['Density'])))
            interpolated_value = griddata(points, values, (t,s), method='linear')
            k=interpolated_value
            Phase=[]
            p=round(float(k[0]),2)
            Enthalpy=round(float(k[1]),2)
            Internal_energy=round(float(k[2]),2)
            
            Density=round(float(k[4]),2)
            Specific_volume=round((1/Density),5)
            
            point = np.array(list(zip(df_t['Temperature'])))
            value = np.array(list(zip(df_t['P (MPa)'])))
            q1 = griddata(point, value, (t), method='linear')
            Sat_p=round(float(q1[0]),2)
            
            if s > ETRV:
                x=1
                Phase='Vapor'
            elif s < ETRL :
                x=0
                Phase='Liquid'
            elif s==ETRV or s==ETRL:
                Phase='Saturation Temperature'
            Ph=Phase
    else:
        q='g22.12'
        points = np.array(list(zip(df['Temperature'], df['Specific_Entropy'])))
        values = np.array(list(zip(df['Pressure(MPa)'],df['Specific_Enthalpy'],df['Specific_Internal_Energy'],df['Specific_Volume'],df['Density'])))
        interpolated_value = griddata(points, values, (t,s), method='linear')
        k=interpolated_value
        Phase=[]
        p=round(float(k[0]),2)
        Enthalpy=round(float(k[1]),2)
        Internal_energy=round(float(k[2]),2)
        
        Density=round(float(k[4]),2)
        Specific_volume=round((1/Density),5)
        point = np.array(list(zip(df_t['Temperature'])))
        value = np.array(list(zip(df_t['P (MPa)'])))
        q1 = griddata(point, value, (t), method='linear')
        Sat_p=round(float(q1[0]),2)
        
        if p > 22.12 and t > 374 :
            x=1
            Phase='Super Critical Fluid'
        elif p > 22.12 and t < 374:
            x=0
            Phase='Liquid'
            Sat_Temp='No Saturation Temperature'
        Ph=Phase
    return p,Enthalpy,Ph,Sat_p,Specific_volume,Density,Internal_energy,x

def temp_dry(t,x):
    q='L22.12 In'
    points = np.array(list(zip(df_t['Temperature'])))
    values = np.array(list(zip(df_t['P (MPa)'],df_t['Specific Volume Liquid (m^3/kg)'],df_t['Specific Volume Vapor (m^3/kg)'],df_t['Internal Energy Liquid (kJ/kg)'],df_t['Internal Energy Vapor (kJ/kg)'],df_t['Internal Energy of Vaporization (kJ/kg)'],df_t['Enthalpy Liquid (kJ/kg)'],df_t['Enthalpy Vapor (kJ/kg)'],df_t['Enthalpy of Vaporization'],df_t['Entropy Liquid [kJ/(kg K)]'],df_t['Entropy Vapor [kJ/(kg K)]'],df_t['Entropy of Vaporization [kJ/(kg K)]'])))
    interpolated_value = griddata(points, values, (t), method='linear')
    k=interpolated_value
    Sat_p=k[0]
    p=round(Sat_p,2)
    SVL=k[1]
    SVV=k[2]
    IEL=k[3]
    IEV=k[4]
    EL=k[6]
    EV=k[7]
    ETRL=k[9]
    ETRV=k[10]
    Entropy = round(ETRL+x*(ETRV-ETRL),2)
    Enthalpy=round(EL+x*(EV-EL),2)
    Specific_volume=round(SVL+x*(SVV-SVL),5)
    Internal_energy=round(IEL+x*(IEV-IEL),2)
    Density=round((1/Specific_volume),3)
    Ph = 'Saturated'
    return Sat_p,Enthalpy,Specific_volume,Entropy,Internal_energy




app=Flask(__name__)


@app.route('/')
@app.route('/home')
def home():
    return render_template("PT.html")

@app.route('/result', methods=['GET','POST'])

def index():
    result= None
    result_2 = None
    result_3 = None
    result_4 = None
    result_5 = None
    result_6 = None
    result_7 = None
    if request.method=='POST':
        function_name=request.form['condition']
        
        fig = px.line(df_t, x='Entropy Vapor [kJ/(kg K)]', y='Enthalpy Vapor (kJ/kg)', color_discrete_sequence=['red'])
        fig.add_scatter(x=df_t['Entropy Vapor [kJ/(kg K)]'], y=df_t['Enthalpy Vapor (kJ/kg)'], marker=dict(color='red', size=10),name='Vapor line')
        fig.add_scatter(x=df_t['Entropy Liquid [kJ/(kg K)]'], y=df_t['Enthalpy Liquid (kJ/kg)'], marker=dict(color='blue', size=10),name='Liquid line')
        fig.update_xaxes(title_text="Entropy")
        fig.update_yaxes(title_text="Enthalpy")

        # Render the template with the plot
        plot_div = fig.to_html(full_html=False)

        if function_name=='PT':
            pressure_unit = request.form['units_pressure']
            temperature_unit =request.form['units_temperature']
            p=float(request.form['pressure'])
            t=float(request.form['temperature'])
            if pressure_unit == "BAR":
                p= p*0.1
            
            if temperature_unit == "F":
                t = (t - 32) * 5/9

            result=steam_calculator(p,t)

            

        elif function_name=='PE':
            pressure_unit1 = request.form['units_pressure1']
            entropy_unit =request.form['units_entropy']
            p=float(request.form['pressure1'])
            s=float(request.form['entropy'])
            if pressure_unit1 == "BAR":
                p= p*0.1
            
            if entropy_unit == "J/kg-K":
                s= s/1000
            result_2=steam_entropy(p,s)
            

        elif function_name=='PH':
            pressure_unit2 = request.form['units_pressure2']
            enthalpy_unit =request.form['units_enthalpy']
            p=float(request.form['pressure2'])
            h=float(request.form['enthalpy'])
            if pressure_unit2 == "BAR":
                p= p*0.1
            if enthalpy_unit == "J/kg":
                h=h/1000
            result_3=steam_enthalpy(p,h)
        
        elif function_name=='PX':
            pressure_unit3 = request.form['units_pressure3']
            dryness_unit =request.form['units_dryness']
            p=float(request.form['pressure3'])
            x=float(request.form['dryness'])
            if pressure_unit3 == "BAR":
                p= p*0.1
            if dryness_unit == "%":
                x = x/100
            result_4=steam_dry(p,x)
        elif function_name=='TE':
            temperature_unit1 = request.form['units_temperature1']
            entropy_unit1 =request.form['units_entropy1']
            t=float(request.form['temperature1'])
            s=float(request.form['entropy1'])
            if temperature_unit1 == "F":
                t = (t - 32) * 5/9
            if entropy_unit1 == "J/kg-K":
                s = s/1000
            result_5= temp_entropy(t,s)
        elif function_name=='TH':
            temperature_unit2 = request.form['units_temperature2']
            enthalpy_unit1 =request.form['units_enthalpy1']
            t=float(request.form['temperature2'])
            h=float(request.form['enthalpy1'])
            if temperature_unit2 == "F":
                t = (t - 32) * 5/9
            if enthalpy_unit1 == "J/kg":
                h = h/1000
            result_6= temp_enthalpy(t,h)

        elif function_name=='TX':
            temperature_unit3 = request.form['units_temperature3']
            dryness_unit1 =request.form['units_dryness1']
            t=float(request.form['temperature3'])
            x=float(request.form['dryness1'])
            if temperature_unit3 == "F":
                t = (t - 32) * 5/9
            if dryness_unit1 == "%":
                x = x/100
            result_7= temp_dry(t,x)

     

        
    return render_template("PT.html",plot_div=plot_div, result=result, result_2=result_2, result_3=result_3, result_4=result_4,result_5=result_5,result_6=result_6,result_7=result_7)


if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('localhost', 5000, app)