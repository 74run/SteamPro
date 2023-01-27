import pandas as pd
import matplotlib.pyplot as plt



def steam_calculator(p3,t4):
    df_t= pd.read_csv("SST.csv")
    df_p= pd.read_csv("SSP.csv")
    df_c1= pd.read_csv("CLS.csv")
    df_t.rename(columns={'T (C)':'Temperature'},inplace=True)
    df_c=df_c1[df_c1["Phase"].isin(['Liquid','Vapor','SupercriticalFluid'])]
    de=df_c1[df_c1["Phase"].isin(['SaturatedVapor','SaturatedLiquid'])]
    df_c=df_c.reset_index(drop=True)
    df_c['Phase']=df_c['Phase'].astype(str)
    EnL=df_t[['Entropy Liquid [kJ/(kg K)]']].values
    EnV=df_t[['Entropy Vapor [kJ/(kg K)]']].values
    EnVap=EnV-EnL
    EtV=df_t[['Enthalpy Vapor (kJ/kg)']].values
    EtL=df_t[['Enthalpy Liquid (kJ/kg)']].values
    EtVap=EtV-EtL
    P=df_c['Pressure(MPa)']
    T=df_c['Temperature']

    if p3 in P.values and t4 in T.values:
        #print('Both Found')
        d1=df_c[df_c['Pressure(MPa)']==p3]
        d2=d1[d1['Temperature']==t4]
        k=d2.iloc[0, [2,3,4,5,6]]
        Specific_volume=float(k[0])
        Density=float(k[1])
        Internal_energy=float(k[2])
        Enthalpy=float(k[3])
        Entropy=float(k[4])
        q=de[de['Pressure(MPa)']==p3]
        q1=q['Temperature'].values
        Sat_Temp=round(float(q1[0]),2)
        Phase=d2['Phase'].values
        Ph=Phase[0]
        plt.scatter(df_t['Entropy Vapor [kJ/(kg K)]'],df_t['Enthalpy Vapor (kJ/kg)'],c=df_t['Temperature'])
        plt.scatter(df_t['Entropy Liquid [kJ/(kg K)]'],df_t['Enthalpy Liquid (kJ/kg)'],c=df_t['Temperature'])
        plt.scatter(Entropy,Enthalpy,color='black',marker='*')
        plt.grid()
        #plt.xlim(5.5, 9)
        #plt.ylim(1700, 4200)
        plt.title("Enthalpy Vs Entropy")
        plt.xlabel('Entropy')
        plt.ylabel('Enthalpy')
        
        #plt.show()
        plt.savefig("static/scatter_plot.png")
        return Enthalpy,Entropy,Ph,Sat_Temp,Specific_volume,Density,Internal_energy
    
        
    
    elif p3 not in P.values and t4 not in T.values:
        #print('P not Found and T not Found')
        Low_P_data=df_c[df_c['Pressure(MPa)']<p3]
        L_Pres=max(Low_P_data['Pressure(MPa)'])
        Lowpressuredata=df_c[df_c['Pressure(MPa)']==L_Pres]
        High_P_data=df_c[df_c['Pressure(MPa)']>p3]
        H_Pres=min(High_P_data['Pressure(MPa)'])
        Highpressuredata=df_c[df_c['Pressure(MPa)']==H_Pres]
        LowL_temp_data=Lowpressuredata[Lowpressuredata['Temperature']<t4]
        LL_Temp=max(LowL_temp_data['Temperature'])
        HighL_temp_data=Lowpressuredata[Lowpressuredata['Temperature']>t4]
        LH_Temp=min(HighL_temp_data['Temperature'])
        L_Pres_LL_Temp=Lowpressuredata[Lowpressuredata['Temperature']==LL_Temp]
        L_Pres_LH_Temp=Lowpressuredata[Lowpressuredata['Temperature']==LH_Temp]

        kLPLLT=L_Pres_LL_Temp.iloc[0, [2,3,4,5,6]]
        kLPLHT=L_Pres_LH_Temp.iloc[0,[2,3,4,5,6]]
        Specific_volumeLPLLT=float(kLPLLT[0])
        DensityLPLLT=float(kLPLLT[1])
        Internal_energyLPLLT=float(kLPLLT[2])
        EnthalpyLPLLT=float(kLPLLT[3])
        EntropyLPLLT=float(kLPLLT[4])
        #
        Specific_volumeLPLHT=float(kLPLHT[0])
        DensityLPLHT=float(kLPLHT[1])
        Internal_energyLPLHT=float(kLPLHT[2])
        EnthalpyLPLHT=float(kLPLHT[3])
        EntropyLPLHT=float(kLPLHT[4])     
        #
        Enthalpy1=((EnthalpyLPLHT-EnthalpyLPLLT)/(LH_Temp-LL_Temp))*(t4-LL_Temp)+EnthalpyLPLLT
        Entropy1= ((EntropyLPLHT-EntropyLPLLT)/(LH_Temp-LL_Temp))*(t4-LL_Temp)+EntropyLPLLT
        Sp_vol1=((Specific_volumeLPLHT-Specific_volumeLPLLT)/(LH_Temp-LL_Temp))*(t4-LL_Temp)+Specific_volumeLPLLT
        Den1=((DensityLPLHT-DensityLPLLT)/(LH_Temp-LL_Temp))*(t4-LL_Temp)+DensityLPLLT
        InEn1=((Internal_energyLPLHT-Internal_energyLPLLT)/(LH_Temp-LL_Temp))*(t4-LL_Temp)+Internal_energyLPLLT


        HighL_temp_data=Highpressuredata[Highpressuredata['Temperature']<t4]
        HL_Temp=max(HighL_temp_data['Temperature'])
        HighH_temp_data=Highpressuredata[Highpressuredata['Temperature']>t4]
        HH_Temp=min(HighH_temp_data['Temperature'])
        H_Pres_data=df_c[df_c['Pressure(MPa)']==H_Pres]
        H_Pres_HL_Temp=Highpressuredata[Highpressuredata['Temperature']==HL_Temp]
        H_Pres_HH_Temp=Highpressuredata[Highpressuredata['Temperature']==HH_Temp]


        kHPHLT=H_Pres_HL_Temp.iloc[0, [2,3,4,5,6]]
        kHPHHT=H_Pres_HH_Temp.iloc[0,[2,3,4,5,6]]
        #
        Specific_volumeHPHLT=float(kHPHLT[0])
        DensityHPHLT=float(kHPHLT[1])
        Internal_energyHPHLT=float(kHPHLT[2])
        EnthalpyHPHLT=float(kHPHLT[3])
        EntropyHPHLT=float(kHPHLT[4])
        #
        Specific_volumeHPHHT=float(kHPHHT[0])
        DensityHPHHT=float(kHPHHT[1])
        Internal_energyHPHHT=float(kHPHHT[2])
        EnthalpyHPHHT=float(kHPHHT[3])
        EntropyHPHHT=float(kHPHHT[4])
        #
        
        Enthalpy2=((EnthalpyHPHHT-EnthalpyHPHLT)/(HH_Temp-HL_Temp))*(t4-HL_Temp)+EnthalpyHPHLT
        Entropy2= ((EntropyHPHHT-EntropyHPHLT)/(HH_Temp-HL_Temp))*(t4-HL_Temp)+EntropyHPHLT
        Sp_vol2=((Specific_volumeHPHHT-Specific_volumeHPHLT)/(HH_Temp-HL_Temp))*(t4-HL_Temp)+Specific_volumeHPHLT
        Den2=((DensityHPHHT-DensityHPHLT)/(HH_Temp-HL_Temp))*(t4-HL_Temp)+DensityHPHLT
        InEn2=((Internal_energyHPHHT-Internal_energyHPHLT)/(HH_Temp-HL_Temp))*(t4-HL_Temp)+Internal_energyHPHLT

        Enthalpy=((Enthalpy2-Enthalpy1)/(H_Pres-L_Pres))*(p3-L_Pres)+Enthalpy1
        Entropy= ((Entropy2-Entropy1)/(H_Pres-L_Pres))*(p3-L_Pres)+Entropy1
        Sp_Vol=((Sp_vol2-Sp_vol1)/(H_Pres-L_Pres))*(p3-L_Pres)+Sp_vol1
        Den=((Den2-Den1)/(H_Pres-L_Pres))*(p3-L_Pres)+Den1
        InEn=((InEn2-InEn1)/(H_Pres-L_Pres))*(p3-L_Pres)+InEn1
        Enthalpy=round(Enthalpy,2)
        Entropy=round(Entropy,2)
        Sp_Vol=round(Sp_Vol,5)
        Den=round(Den,2)
        InEn=round(InEn,2)
        #

        qLPD=de[de['Pressure(MPa)']<p3]
        qLP=max(qLPD['Pressure(MPa)'])
        q1=de[de['Pressure(MPa)']==qLP]
        qHPD=de[de['Pressure(MPa)']>p3]
        qHP=min(qHPD['Pressure(MPa)'])
        q2=de[de['Pressure(MPa)']==qHP]
        qTL=q1['Temperature'].values[0]
        qTH=q2['Temperature'].values[0]
        sat_Temp=((qTH-qTL)/(qHP-qLP))*(p3-qLP)+qTL
        Sat_Temp=round(float(sat_Temp),2)
        Phase=H_Pres_HH_Temp['Phase'].values
        Ph=Phase[0]
        plt.scatter(df_t['Entropy Vapor [kJ/(kg K)]'],df_t['Enthalpy Vapor (kJ/kg)'],c=df_t['Temperature'])
        plt.scatter(df_t['Entropy Liquid [kJ/(kg K)]'],df_t['Enthalpy Liquid (kJ/kg)'],c=df_t['Temperature'])
        plt.scatter(Entropy,Enthalpy,color='black',marker='*')
        plt.grid()
        #plt.xlim(5.5, 9)
        #plt.ylim(1700, 4200)
        plt.title("Enthalpy Vs Entropy")
        plt.xlabel('Entropy')
        plt.ylabel('Enthalpy')
        
        plt.savefig("static/scatter_plot.png")
        return Enthalpy,Entropy,Ph,Sat_Temp,Sp_Vol,Den,InEn
    
    
    elif p3 not in P.values and t4 in T.values:
        #print("P not Found and T Found")
        Low_P_data=df_c[df_c['Pressure(MPa)']<p3]
        L_Pres=max(Low_P_data['Pressure(MPa)'])
        High_P_data=df_c[df_c['Pressure(MPa)']>p3]
        H_Pres=min(High_P_data['Pressure(MPa)'])
        L_Pres_data=df_c[df_c['Pressure(MPa)']==L_Pres]
        L_Pres_Temp=L_Pres_data[L_Pres_data['Temperature']==t4]
        H_Pres_data=df_c[df_c['Pressure(MPa)']==H_Pres]
        H_Pres_Temp=H_Pres_data[H_Pres_data['Temperature']==t4]

        kLPT=L_Pres_Temp.iloc[0, [2,3,4,5,6]]
        kHPT=H_Pres_Temp.iloc[0,[2,3,4,5,6]]
        
        Specific_volumeLPT=float(kLPT[0])
        DensityLPT=float(kLPT[1])
        Internal_energyLPT=float(kLPT[2])
        EnthalpyLPT=float(kLPT[3])
        EntropyLPT=float(kLPT[4])
        
        Specific_volumeHPT=float(kHPT[0])
        DensityHPT=float(kHPT[1])
        Internal_energyHPT=float(kHPT[2])
        EnthalpyHPT=float(kHPT[3])
        EntropyHPT=float(kHPT[4])           

        Enthalpy=((EnthalpyHPT-EnthalpyLPT)/(H_Pres-L_Pres))*(p3-L_Pres)+EnthalpyLPT
        Entropy= ((EntropyHPT-EntropyLPT)/(H_Pres-L_Pres))*(p3-L_Pres)+EntropyLPT
        Sp_Vol=((Specific_volumeHPT-Specific_volumeLPT)/(H_Pres-L_Pres))*(p3-L_Pres)+Specific_volumeLPT
        Den= ((DensityHPT-DensityLPT)/(H_Pres-L_Pres))*(p3-L_Pres)+DensityLPT
        InEn=((Internal_energyHPT-Internal_energyLPT)/(H_Pres-L_Pres))*(p3-L_Pres)+Internal_energyLPT      
        
        Enthalpy=round(Enthalpy,2)
        Entropy=round(Entropy,2)
        Sp_Vol=round(Sp_Vol,5)
        Den=round(Den,2)
        InEn=round(InEn,2)



        Phase=H_Pres_Temp['Phase'].values
        Ph=Phase[0]
        qLPD=de[de['Pressure(MPa)']<p3]
        qLP=max(qLPD['Pressure(MPa)'])
        q1=de[de['Pressure(MPa)']==qLP]
        qHPD=de[de['Pressure(MPa)']>p3]
        qHP=min(qHPD['Pressure(MPa)'])
        q2=de[de['Pressure(MPa)']==qHP]
        qTL=q1['Temperature'].values[0]
        qTH=q2['Temperature'].values[0]
        sat_Temp=((qTH-qTL)/(qHP-qLP))*(p3-qLP)+qTL
        Sat_Temp=round(float(sat_Temp),2)
        plt.scatter(df_t['Entropy Vapor [kJ/(kg K)]'],df_t['Enthalpy Vapor (kJ/kg)'],c=df_t['Temperature'])
        plt.scatter(df_t['Entropy Liquid [kJ/(kg K)]'],df_t['Enthalpy Liquid (kJ/kg)'],c=df_t['Temperature'])
        plt.scatter(Entropy,Enthalpy,color='black',marker='*')
        plt.grid()
        #plt.xlim(5.5, 9)
        #plt.ylim(1700, 4200)
        plt.title("Enthalpy Vs Entropy")
        plt.xlabel('Entropy')
        plt.ylabel('Enthalpy')
        
        #plt.show()
        plt.savefig("static/scatter_plot.png")
        return Enthalpy,Entropy,Ph,Sat_Temp,Sp_Vol,Den,InEn
    
    else:
        #print('P found and T not found')
        P_data=df_c[df_c['Pressure(MPa)']==p3]
        Low_temp_data=P_data[P_data['Temperature']<t4]
        L_Temp=max(Low_temp_data['Temperature'])
        High_temp_data=P_data[P_data['Temperature']>t4]
        H_Temp=min(High_temp_data['Temperature'])
        Pres_L_Temp=P_data[P_data['Temperature']==L_Temp]
        Pres_H_Temp=P_data[P_data['Temperature']==H_Temp]

        kLPT=Pres_L_Temp.iloc[0, [2,3,4,5,6]]
        kHPT=Pres_H_Temp.iloc[0,[2,3,4,5,6]]
        
        Specific_volumeLPT=float(kLPT[0])
        DensityLPT=float(kLPT[1])
        Internal_energyLPT=float(kLPT[2])
        EnthalpyLPT=float(kLPT[3])
        EntropyLPT=float(kLPT[4])
        
        Specific_volumeHPT=float(kHPT[0])
        DensityHPT=float(kHPT[1])
        Internal_energyHPT=float(kHPT[2])
        EnthalpyHPT=float(kHPT[3])
        EntropyHPT=float(kHPT[4])           

        Enthalpy=((EnthalpyHPT-EnthalpyLPT)/(H_Temp-L_Temp))*(t4-L_Temp)+EnthalpyLPT
        Entropy= ((EntropyHPT-EntropyLPT)/(H_Temp-L_Temp))*(t4-L_Temp)+EntropyLPT
        Sp_Vol=((Specific_volumeHPT-Specific_volumeLPT)/(H_Temp-L_Temp))*(t4-L_Temp)+Specific_volumeLPT
        Den= ((DensityHPT-DensityLPT)/(H_Temp-L_Temp))*(t4-L_Temp)+DensityLPT
        InEn=((Internal_energyHPT-Internal_energyLPT)/(H_Temp-L_Temp))*(t4-L_Temp)+Internal_energyLPT 
        
        Enthalpy=round(Enthalpy,2)
        Entropy=round(Entropy,2)
        Sp_Vol=round(Sp_Vol,5)
        Den=round(Den,2)
        InEn=round(InEn,2)


        
        q=de[de['Pressure(MPa)']==p3]
        q1=q['Temperature'].values
        Sat_Temp=round(float(q1[0]),2)
        Phase=Pres_H_Temp['Phase'].values
        Ph=Phase[0]
        plt.scatter(df_t['Entropy Vapor [kJ/(kg K)]'],df_t['Enthalpy Vapor (kJ/kg)'],c=df_t['Temperature'])
        plt.scatter(df_t['Entropy Liquid [kJ/(kg K)]'],df_t['Enthalpy Liquid (kJ/kg)'],c=df_t['Temperature'])
        plt.scatter(Entropy,Enthalpy,color='black',marker='*')
        plt.grid()
        #plt.xlim(5.5, 9)
        #plt.ylim(1700, 4200)
        plt.title("Enthalpy Vs Entropy")
        plt.xlabel('Entropy')
        plt.ylabel('Enthalpy')
        #plt.show()
        plt.savefig("static/scatter_plot.png")
        return Enthalpy,Entropy,Ph,Sat_Temp,Sp_Vol,Den,InEn

print(steam_calculator(2.34,345))