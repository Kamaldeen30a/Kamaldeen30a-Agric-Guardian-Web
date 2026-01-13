
-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'farmer', 'agronomist', 'viewer');

-- Create user_roles table (security best practice - roles in separate table)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'farmer',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create profiles table for extended user information
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create farms table
CREATE TABLE public.farms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    total_hectares DECIMAL(10, 2) DEFAULT 0,
    location TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create fields table (individual fields within farms)
CREATE TABLE public.fields (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    hectares DECIMAL(10, 2) DEFAULT 0,
    crop_type TEXT,
    geo_boundary JSONB,
    health_status TEXT DEFAULT 'healthy' CHECK (health_status IN ('healthy', 'warning', 'critical')),
    planted_date DATE,
    expected_harvest_date DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create soil_health_records table
CREATE TABLE public.soil_health_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    nitrogen_level DECIMAL(5, 2),
    phosphorus_level DECIMAL(5, 2),
    potassium_level DECIMAL(5, 2),
    ph_level DECIMAL(4, 2),
    organic_matter DECIMAL(5, 2),
    moisture_content DECIMAL(5, 2),
    soil_composition JSONB DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scouting_reports table
CREATE TABLE public.scouting_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    reported_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    issue_type TEXT,
    severity TEXT DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    description TEXT,
    photos TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create disease_detections table
CREATE TABLE public.disease_detections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scouting_report_id UUID REFERENCES public.scouting_reports(id) ON DELETE SET NULL,
    field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
    image_url TEXT NOT NULL,
    disease_type TEXT NOT NULL,
    confidence_score DECIMAL(5, 4) NOT NULL,
    treatment_recommendations TEXT,
    ai_response JSONB DEFAULT '{}',
    detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create microclimate_data table
CREATE TABLE public.microclimate_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    temperature DECIMAL(5, 2),
    humidity DECIMAL(5, 2),
    wind_speed DECIMAL(5, 2),
    wind_direction TEXT,
    rainfall DECIMAL(5, 2),
    solar_radiation DECIMAL(8, 2),
    soil_temperature DECIMAL(5, 2),
    weather_condition TEXT,
    forecast_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create inventory_items table
CREATE TABLE public.inventory_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('seeds', 'fertilizers', 'chemicals', 'equipment', 'other')),
    quantity DECIMAL(10, 2) NOT NULL DEFAULT 0,
    unit TEXT NOT NULL,
    reorder_level DECIMAL(10, 2) DEFAULT 0,
    cost_per_unit DECIMAL(10, 2),
    supplier TEXT,
    expiry_date DATE,
    storage_location TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create inventory_transactions table for tracking usage
CREATE TABLE public.inventory_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inventory_item_id UUID REFERENCES public.inventory_items(id) ON DELETE CASCADE NOT NULL,
    field_id UUID REFERENCES public.fields(id) ON DELETE SET NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('add', 'use', 'adjust', 'expired')),
    quantity DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create seasonal_reports table
CREATE TABLE public.seasonal_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE NOT NULL,
    report_type TEXT NOT NULL,
    season TEXT NOT NULL,
    year INTEGER NOT NULL,
    data JSONB DEFAULT '{}',
    generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    file_url TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'final', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ai_chat_history table
CREATE TABLE public.ai_chat_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    farm_id UUID REFERENCES public.farms(id) ON DELETE SET NULL,
    session_id UUID NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    context JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    read BOOLEAN DEFAULT false,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soil_health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scouting_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disease_detections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.microclimate_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seasonal_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to get user's farm IDs
CREATE OR REPLACE FUNCTION public.get_user_farm_ids(_user_id uuid)
RETURNS SETOF uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.farms WHERE user_id = _user_id
$$;

-- Create function to check farm ownership
CREATE OR REPLACE FUNCTION public.owns_farm(_user_id uuid, _farm_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.farms
    WHERE id = _farm_id
      AND user_id = _user_id
  )
$$;

-- Create function to check field access via farm ownership
CREATE OR REPLACE FUNCTION public.has_field_access(_user_id uuid, _field_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.fields f
    JOIN public.farms fa ON f.farm_id = fa.id
    WHERE f.id = _field_id
      AND fa.user_id = _user_id
  )
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for farms
CREATE POLICY "Users can view their own farms" ON public.farms
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create farms" ON public.farms
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own farms" ON public.farms
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own farms" ON public.farms
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for fields (access through farm ownership)
CREATE POLICY "Users can view fields of their farms" ON public.fields
    FOR SELECT USING (public.has_field_access(auth.uid(), id) OR farm_id IN (SELECT public.get_user_farm_ids(auth.uid())));

CREATE POLICY "Users can create fields in their farms" ON public.fields
    FOR INSERT WITH CHECK (public.owns_farm(auth.uid(), farm_id));

CREATE POLICY "Users can update fields in their farms" ON public.fields
    FOR UPDATE USING (public.owns_farm(auth.uid(), farm_id));

CREATE POLICY "Users can delete fields in their farms" ON public.fields
    FOR DELETE USING (public.owns_farm(auth.uid(), farm_id));

-- RLS Policies for soil_health_records
CREATE POLICY "Users can view soil records of their fields" ON public.soil_health_records
    FOR SELECT USING (public.has_field_access(auth.uid(), field_id));

CREATE POLICY "Users can create soil records for their fields" ON public.soil_health_records
    FOR INSERT WITH CHECK (public.has_field_access(auth.uid(), field_id));

CREATE POLICY "Users can update soil records of their fields" ON public.soil_health_records
    FOR UPDATE USING (public.has_field_access(auth.uid(), field_id));

CREATE POLICY "Users can delete soil records of their fields" ON public.soil_health_records
    FOR DELETE USING (public.has_field_access(auth.uid(), field_id));

-- RLS Policies for scouting_reports
CREATE POLICY "Users can view scouting reports of their fields" ON public.scouting_reports
    FOR SELECT USING (public.has_field_access(auth.uid(), field_id));

CREATE POLICY "Users can create scouting reports for their fields" ON public.scouting_reports
    FOR INSERT WITH CHECK (public.has_field_access(auth.uid(), field_id) AND auth.uid() = user_id);

CREATE POLICY "Users can update their scouting reports" ON public.scouting_reports
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their scouting reports" ON public.scouting_reports
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for disease_detections
CREATE POLICY "Users can view their disease detections" ON public.disease_detections
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create disease detections" ON public.disease_detections
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for microclimate_data
CREATE POLICY "Users can view microclimate data of their fields" ON public.microclimate_data
    FOR SELECT USING (public.has_field_access(auth.uid(), field_id));

CREATE POLICY "Users can create microclimate data for their fields" ON public.microclimate_data
    FOR INSERT WITH CHECK (public.has_field_access(auth.uid(), field_id));

-- RLS Policies for inventory_items
CREATE POLICY "Users can view inventory of their farms" ON public.inventory_items
    FOR SELECT USING (public.owns_farm(auth.uid(), farm_id));

CREATE POLICY "Users can create inventory in their farms" ON public.inventory_items
    FOR INSERT WITH CHECK (public.owns_farm(auth.uid(), farm_id));

CREATE POLICY "Users can update inventory in their farms" ON public.inventory_items
    FOR UPDATE USING (public.owns_farm(auth.uid(), farm_id));

CREATE POLICY "Users can delete inventory in their farms" ON public.inventory_items
    FOR DELETE USING (public.owns_farm(auth.uid(), farm_id));

-- RLS Policies for inventory_transactions
CREATE POLICY "Users can view transactions of their inventory" ON public.inventory_transactions
    FOR SELECT USING (
        inventory_item_id IN (
            SELECT id FROM public.inventory_items 
            WHERE farm_id IN (SELECT public.get_user_farm_ids(auth.uid()))
        )
    );

CREATE POLICY "Users can create transactions for their inventory" ON public.inventory_transactions
    FOR INSERT WITH CHECK (
        inventory_item_id IN (
            SELECT id FROM public.inventory_items 
            WHERE farm_id IN (SELECT public.get_user_farm_ids(auth.uid()))
        ) AND auth.uid() = user_id
    );

-- RLS Policies for seasonal_reports
CREATE POLICY "Users can view reports of their farms" ON public.seasonal_reports
    FOR SELECT USING (public.owns_farm(auth.uid(), farm_id));

CREATE POLICY "Users can create reports for their farms" ON public.seasonal_reports
    FOR INSERT WITH CHECK (public.owns_farm(auth.uid(), farm_id));

CREATE POLICY "Users can update reports of their farms" ON public.seasonal_reports
    FOR UPDATE USING (public.owns_farm(auth.uid(), farm_id));

CREATE POLICY "Users can delete reports of their farms" ON public.seasonal_reports
    FOR DELETE USING (public.owns_farm(auth.uid(), farm_id));

-- RLS Policies for ai_chat_history
CREATE POLICY "Users can view their own chat history" ON public.ai_chat_history
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat messages" ON public.ai_chat_history
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications" ON public.notifications
    FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_farms_updated_at BEFORE UPDATE ON public.farms
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fields_updated_at BEFORE UPDATE ON public.fields
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_scouting_reports_updated_at BEFORE UPDATE ON public.scouting_reports
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inventory_items_updated_at BEFORE UPDATE ON public.inventory_items
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'farmer');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('scouting-photos', 'scouting-photos', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('disease-images', 'disease-images', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('reports', 'reports', false);

-- Storage policies for avatars bucket (public)
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar" ON storage.objects
    FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar" ON storage.objects
    FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for scouting-photos bucket (private)
CREATE POLICY "Users can view their scouting photos" ON storage.objects
    FOR SELECT USING (bucket_id = 'scouting-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload scouting photos" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'scouting-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their scouting photos" ON storage.objects
    FOR DELETE USING (bucket_id = 'scouting-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for disease-images bucket (private)
CREATE POLICY "Users can view their disease images" ON storage.objects
    FOR SELECT USING (bucket_id = 'disease-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload disease images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'disease-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their disease images" ON storage.objects
    FOR DELETE USING (bucket_id = 'disease-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for reports bucket (private)
CREATE POLICY "Users can view their reports" ON storage.objects
    FOR SELECT USING (bucket_id = 'reports' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload reports" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'reports' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their reports" ON storage.objects
    FOR DELETE USING (bucket_id = 'reports' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create indexes for better query performance
CREATE INDEX idx_farms_user_id ON public.farms(user_id);
CREATE INDEX idx_fields_farm_id ON public.fields(farm_id);
CREATE INDEX idx_soil_health_field_id ON public.soil_health_records(field_id);
CREATE INDEX idx_soil_health_recorded_at ON public.soil_health_records(recorded_at);
CREATE INDEX idx_scouting_reports_field_id ON public.scouting_reports(field_id);
CREATE INDEX idx_scouting_reports_status ON public.scouting_reports(status);
CREATE INDEX idx_disease_detections_user_id ON public.disease_detections(user_id);
CREATE INDEX idx_microclimate_field_id ON public.microclimate_data(field_id);
CREATE INDEX idx_microclimate_recorded_at ON public.microclimate_data(recorded_at);
CREATE INDEX idx_inventory_farm_id ON public.inventory_items(farm_id);
CREATE INDEX idx_inventory_category ON public.inventory_items(category);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);
CREATE INDEX idx_ai_chat_session ON public.ai_chat_history(session_id);

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.scouting_reports;
ALTER PUBLICATION supabase_realtime ADD TABLE public.disease_detections;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.inventory_items;
